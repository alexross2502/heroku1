const { Confirmation } = require("../models/models");
const ApiError = require("../error/ApiError");
const nodemailer = require("nodemailer");

class ConfirmationController {
  async getAll(req, res) {
    const confirmation = await Confirmation.findAll();
    return res.json(confirmation);
  }

  async addNew(req, res, next) {
    try {
      const {
        id,
        masterName,
        masterSurname,
        clientEmail,
        townName,
        masterRating,
        day,
        hours,
      } = req.body;
      const confirmation = await Confirmation.create({
        id,
        masterName,
        masterSurname,
        clientEmail,
        townName,
        masterRating,
        day,
        hours,
      });
      return res.json(confirmation);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    const { id } = req.body;
    let availability = await Confirmation.findOne({
      where: { id: id },
    });

    return res.json(availability);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const confirmation = await Confirmation.destroy({ where: { id: id } });
    return res.json(confirmation);
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
      html: `Вы успешно заказали мастера ${name} ${surname} с рейтингом ${rating}`,
    });

    return res.json(result);
  }
}

module.exports = new ConfirmationController();
