const Router = require("express");
const router = new Router();
const mastersController = require("../controllers/mastersController");
const passport = require("passport");

router.post(
  "/",

  mastersController.create
);
router.get(
  "/",

  mastersController.getAll
);
router.delete(
  "/:id",

  mastersController.destroy
);
router.get("/:name", mastersController.getAvailable);

module.exports = router;
