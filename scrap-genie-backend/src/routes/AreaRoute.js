const routes = require("express").Router();
const areaController = require("../controllers/AreaController");

routes.post("/add", areaController.addArea);
routes.get("/all", areaController.getAllAreas);
routes.get("/getareabycity/:cityId",areaController.getAreaByCityId)
routes.delete("/:id", areaController.deleteArea);

module.exports = routes;
