const Router = require("express");
const router = new Router();
const clientsController = require("../controllers/clientsController");

router.get("/", clientsController.getAll);
router.post("/", clientsController.create);
router.delete("/:id", clientsController.destroy);

module.exports = router;
