const { Reservation } = require("../models/models");
const ApiError = require("../error/ApiError");
const nodemailer = require("nodemailer");

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
}

module.exports = new ReservationController();
