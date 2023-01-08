const Router = require("express");
const router = new Router();
const townsController = require("../controllers/townsController");

router.get("/", townsController.getAll);
router.post("/", townsController.create);
router.delete("/:id", townsController.destroy);

module.exports = router;
