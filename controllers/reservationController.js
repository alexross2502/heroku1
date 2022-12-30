const { Reservation, Masters, Towns } = require("../models/models");
const ApiError = require("../error/ApiError");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

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
    try {
      const { day, hours, master_id, towns_id } = req.body;
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

    let finaleMasters = [];

    includingMasters.forEach((el) => {
      finaleMasters.push(el.id);
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
          if (finaleMasters.indexOf(el.master_id) !== -1) {
            finaleMasters.splice(finaleMasters.indexOf(el.master_id), 1);
          }
        }
      });
    }
    return res.json(finaleMasters);
  }
}

module.exports = new ReservationController();
