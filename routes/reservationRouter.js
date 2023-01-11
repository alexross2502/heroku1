const Router = require("express");
const router = new Router();
const reservationController = require("../controllers/reservationController");
const passport = require("passport");

router.get(
  "/",

  reservationController.getAll
);
router.post("/", reservationController.create);
router.delete(
  "/:id",

  reservationController.destroy
);
router.get(
  "/:id",

  reservationController.getAvailable
);
router.post("/mail", reservationController.sendMail);
router.post("/available", reservationController.availableMasters);

module.exports = router;
