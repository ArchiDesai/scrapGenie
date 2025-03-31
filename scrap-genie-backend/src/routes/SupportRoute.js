const routes = require("express").Router();
const supportController = require("../controllers/SupportController");

routes.post("/add", supportController.addSupport);

module.exports = routes;
