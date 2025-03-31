const routes = require("express").Router();
const communicationController = require("../controllers/CommunicationController");

routes.post("/add", communicationController.addCommunication);
routes.get("/getallmessagesbyuserid/:id", communicationController.addCommunication);

module.exports = routes;
