const transactionModel = require("../models/TransactionModel");

const addTransaction = async (req, res) => {
  try {
    const savedTransaction = await transactionModel.create(req.body);
    res
      .status(200)
      .json({ message: "transaction created..", data: savedTransaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addTransaction };
