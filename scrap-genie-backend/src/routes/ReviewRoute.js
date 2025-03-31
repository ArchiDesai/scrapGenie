const routes = require("express").Router();
const reviewController = require("../controllers/ReviewController");

routes.post("/add", reviewController.addReview);

module.exports = routes;
