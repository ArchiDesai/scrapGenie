const supportModel = require("../models/SupportModel");

const addSupport = async (req, res) => {
  try {
    const savedSupport = await supportModel.create(req.body);
    res
      .status(200)
      .json({ message: "support msg created..", data: savedSupport });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addSupport };
