const { Clients } = require("../models/models");
const ApiError = require("../error/ApiError");

class ClientsController {
  async create(req, res, next) {
    try {
      const { name, email } = req.body;
      const client = await Clients.create({ name, email });
      return res.json(client);
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
      let existence = await Clients.findOne({
        where: { email: email },
      });
      if (existence == null) {
        const client = await Clients.create({ name, email });
        return res.json(existence);
      } else return res.json(existence);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ClientsController();
