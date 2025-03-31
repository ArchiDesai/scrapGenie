const routes = require("express").Router();
const stateController = require("../controllers/StateController");

routes.post("/add", stateController.addState);
routes.get("/getallstates", stateController.getAllState);
routes.delete("/:id", stateController.deleteState);

module.exports = routes;
