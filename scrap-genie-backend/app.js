// express..
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// express object...1`2
const app = express();
app.use(express.json());
app.use(cors());

// import role route
const roleRoutes = require("./src/routes/RoleRoute");
app.use("/role", roleRoutes);

// import user route
const userRoutes = require("./src/routes/UserRoute");
app.use(userRoutes);

// import state route
const stateRoute = require("./src/routes/StateRoute");
app.use("/state", stateRoute);

//import city route
const cityRoute = require("./src/routes/CityRoute");
app.use("/city", cityRoute);

// import area route
const areaRoute = require("./src/routes/AreaRoute");
app.use("/area", areaRoute);

// import scrap product route
const scrapProductRoute = require("./src/routes/ScrapProductRoute");
app.use("/scrapProduct", scrapProductRoute);

// import buyer route
const buyerRoute = require("./src/routes/BuyerRoute");
app.use("/buyer", buyerRoute);

// import communication route
const communicationRoute = require("./src/routes/CommunicationRoute");
app.use("/communication", communicationRoute);

// import transaction route
const transactionRoute = require("./src/routes/TransactionRoute");
app.use("/transaction", transactionRoute);

// import pickup route
const pickupRoute = require("./src/routes/PickupRoute");
app.use("/pickup", pickupRoute);

// import review route
const reviewRoute = require("./src/routes/ReviewRoute");
app.use("/review", reviewRoute);

// import support route
const supportRoute = require("./src/routes/SupportRoute");
app.use("/support", supportRoute);

mongoose.connect("mongodb://localhost:27017/scrapgenie_backend").then(() => {
  console.log("database connected..");
});

// server creation...
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started on port number ", PORT);
});
