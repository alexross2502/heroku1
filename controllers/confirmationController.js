const { Confirmation } = require("../models/models");
const ApiError = require("../error/ApiError");

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
}

module.exports = new ConfirmationController();
