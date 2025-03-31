const routes = require("express").Router();
const buyerController = require("../controllers/BuyerController");

routes.post("/add", buyerController.addBuyer);

module.exports = routes;
