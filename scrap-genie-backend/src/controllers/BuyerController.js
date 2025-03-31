const buyerModel = require("../models/BuyerModel");

const addBuyer = async (req, res) => {
  try {
    const savedBuyer = await buyerModel.create(req.body);
    res
      .status(200)
      .json({ message: "BUyer created successfully", data: savedBuyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports={addBuyer}