const Router = require("express");
const router = new Router();
const confirmationController = require("../controllers/confirmationController");

router.post("/", confirmationController.addNew);
router.post("/check", confirmationController.check);
router.delete("/:id", confirmationController.destroy);
router.get("/", confirmationController.getAll);
router.post("/mail", confirmationController.sendMail);

module.exports = router;
