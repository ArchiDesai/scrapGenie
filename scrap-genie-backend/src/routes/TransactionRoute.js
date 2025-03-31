const routes = require("express").Router();
const transactionController = require("../controllers/TransactionController");

routes.post("/add", transactionController.addTransaction);

module.exports = routes;
