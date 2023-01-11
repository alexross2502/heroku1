const Router = require("express");
const router = new Router();
const townsController = require("../controllers/townsController");
const passport = require("passport");

router.get("/", townsController.getAll);
router.post("/", townsController.create);
router.delete("/:id", townsController.destroy);

module.exports = router;
