const Router = require("express");
const router = new Router();
const clientsController = require("../controllers/clientsController");
const passport = require("passport");

router.get("/", clientsController.getAll);
router.post("/", clientsController.create);
router.delete("/:id", clientsController.destroy);
router.post("/check", clientsController.check);

module.exports = router;
