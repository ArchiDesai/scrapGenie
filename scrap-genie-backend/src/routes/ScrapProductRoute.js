const routes = require("express").Router();
const scrapProductController = require("../controllers/ScrapProductController");

routes.post("/add", scrapProductController.addScrapProduct);
routes.get("/all", scrapProductController.getAllScrapProduct);
routes.get("/getallscrapproductbyuserid/:userId",scrapProductController.getAllScrapProductByUserId);
routes.post("/addwithfile", scrapProductController.addScrapProductWithFile);
routes.delete("/deleteproductbyid/:id", scrapProductController.deleteScrapProduct);
routes.put("/updateproduct/:id",scrapProductController.updateProductById)
routes.get("/getproductbyid/:id",scrapProductController.getProductById)

module.exports = routes;
