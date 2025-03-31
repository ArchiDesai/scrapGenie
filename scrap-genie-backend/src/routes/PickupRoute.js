const routes = require("express").Router();
const pickupController = require("../controllers/PickupController");

routes.post("/add", pickupController.addPickup);

module.exports = routes;
