const routes = require("express").Router();
const cityController = require("../controllers/CityController");

routes.post("/add", cityController.addCity);
routes.get("/getallcities", cityController.getAllCities);
routes.get("/getcitybystate/:stateId", cityController.getCitiyByStateId);
routes.delete("/:id", cityController.deleteCity);

module.exports = routes;
