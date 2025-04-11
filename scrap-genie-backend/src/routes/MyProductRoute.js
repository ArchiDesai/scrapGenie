const routes = require("express").Router();
const myProductController = require("../controllers/MyProductController");

routes.post("/add", myProductController.addMyProduct);
routes.get("/allproducts", myProductController.getAllProducts);
routes.get("/getproductbyuserid/:userId",myProductController.getAllProductsByUserId);

module.exports = routes;
