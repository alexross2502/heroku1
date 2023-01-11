const { Reservation, Masters, Towns } = require("../models/models");
const ApiError = require("../error/ApiError");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

////Проверка чтоб резерв был на будущее время
function dateChecker(day, hours) {
  let d = new Date();
  let currentDay = String(d.getDate());
  let currentMonth = String(d.getMonth() + 1);
  let currentYear = String(d.getFullYear());
  let currenthour = String(d.getHours())
  let currentTimestamp = dateConverter(currentDay, currentMonth, currentYear, currenthour)
  let date = day.split('.')

  if (date[0][0] == 0) date[0] = date[0][1]
  if(dateConverter(date[0], date[1], date[2], hours.split('-')[0]) > currentTimestamp) {
    return true
  }else return false
}

class ReservationController {
  async getAll(req, res) {
    const reservation = await Reservation.findAll();
    return res.json(reservation);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const reservation = await Reservation.destroy({ where: { id: id } });
    return res.json(reservation);
  }

  async create(req, res, next) {
    const { day, hours, master_id, towns_id } = req.body;
   let check = dateChecker(day, hours)
    if (check) {
      try {
        const reservation = await Reservation.create({
          day,
          hours,
          master_id,
          towns_id,
        });
        return res.json(reservation);
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }else return res.json('vrong date')
  }

  async getAvailable(req, res, next) {
    try {
      const { id } = req.params;
      let availability = await Reservation.findAll({
        where: { towns_id: id },
      });
      return res.json(availability);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async sendMail(req, res, next) {
    const { recipient, name, surname, rating } = req.body;
    let transporter = nodemailer.createTransport({
      host: "mail.ee",
      auth: {
        user: "alexross1994@mail.ee",
        pass: "4QW9nfaVC4",
      },
    });

    let result = await transporter.sendMail({
      from: "alexross1994@mail.ee",
      to: recipient,
      subject: "Уведомление о резерве мастера",
      text: "This message was sent from Node js server.",
      html: `
      Вы успешно заказали мастера ${name} ${surname} с рейтингом ${rating} 
      `,
    });

    return res.json(result);
  }

  //Расчет подходящих мастеров
  async availableMasters(req, res, next) {
    const { town, date, townName } = req.body;

    let includingTowns = await Reservation.findAll({
      where: { towns_id: town },
    });

    let includingReservation = includingTowns.filter(
      (el) => el.day == date.date
    ); //Ищет только резервы на конкретный день заказа

    let includingMasters = await Masters.findAll({
      where: { townName: townName },
    });
    //Берет всех мастеров с этого города

    let finaleMastersIndex = [];
    let temporary = {}
    includingMasters.forEach((el) => {
      finaleMastersIndex.push(el.id);
      temporary[el.id] = {
        id: el.id,
        name: el.name,
        surname: el.surname,
        rating: el.rating
      }
    });

    let timeStart = date.time[0];
    let timeEnd = date.time[1];

    function checkInterval(reservationStart, reservationEnd) {
      if (
        (reservationStart >= timeStart && reservationStart < timeEnd) ||
        (reservationEnd > timeStart && reservationEnd <= timeEnd)
      ) {
        return false;
      } else return true;
    }

    if (includingReservation.length !== 0) {
      includingReservation.forEach((el) => {
        el.hours = el.hours.split("-");
        if (!checkInterval(el.hours[0], el.hours.slice(-1))) {
          if (finaleMastersIndex.indexOf(el.master_id) !== -1) {
            finaleMastersIndex.splice(finaleMastersIndex.indexOf(el.master_id), 1);
          }
        }
      });
    }

    let finaleMasters = []
     finaleMastersIndex.forEach((el) => {
      finaleMasters.push(temporary[el])
    })

    return res.json(finaleMasters)
  }
}

function dateConverter(day, month, year, hour) {
 if (Number(day)[0] == 0) Number(day) = Number(day)[1]
  return (year * 8760 + month * 730 + day * 24 + hour)
}

module.exports = new ReservationController();
