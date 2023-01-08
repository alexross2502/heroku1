const { Admin } = require("../models/models");
const ApiError = require("../error/ApiError");

class AdminController {
  async check(req, res, next) {
    try {
      const { login, password } = req.body;
      let availability = await Admin.findOne({
        where: { email: login, password: password },
      });
      return res.json(!!availability);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

async function create(email, password) {
  let availability = await Admin.findOne({
    where: { email: "admin@example.com" },
  });
  if (!availability) {
    await Admin.create({ email, password });
  }
}

create("admin@example.com", "passwordsecret");

module.exports = new AdminController();
