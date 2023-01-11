const { Clients } = require("../models/models");
const ApiError = require("../error/ApiError");

const regexEmail =
  /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;

const regexName = /^[а-яА-я]+$/;

class ClientsController {
  async create(req, res, next) {
    try {
      const { name, email } = req.body;
      if (regexName.test(name) && regexEmail.test(email)) {
        const client = await Clients.create({ name, email });
        return res.json(client);
      } else {
        return res.json("Неверный формат данных");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const clients = await Clients.findAll();
    return res.json(clients);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const client = await Clients.destroy({ where: { id: id } });
    return res.json(client);
  }

  //Создание нового клиента, если такой почты не существует
  async check(req, res, next) {
    try {
      const { name, email } = req.body;
      if (regexName.test(name) && regexEmail.test(email)) {
        let existence = await Clients.findOne({
          where: { email: email },
        });
        if (existence == null) {
          const client = await Clients.create({ name, email });
          return res.json(existence);
        } else return res.json(existence);
      } else {
        return res.json("Неверный формат данных");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ClientsController();
