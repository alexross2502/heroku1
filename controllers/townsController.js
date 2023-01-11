const { Towns } = require("../models/models");
const ApiError = require("../error/ApiError");

const regexText = /^[а-яА-я]+$/;

class TownsController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (regexText.test(name)) {
        const town = await Towns.create({ name: name });
        return res.json(town);
      } else {
        return res.json("Неверный формат данных");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const towns = await Towns.findAll();
    return res.json(towns);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const towns = await Towns.destroy({ where: { id: id } });
    return res.json(towns);
  }
}

module.exports = new TownsController();
