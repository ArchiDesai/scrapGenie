const reviewModel = require("../models/ReviewModel");

const addReview = async (req, res) => {
  try {
    const savedReview = await reviewModel.create(req.body);
    res.status(200).json({ message: "review created..", data: savedReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addReview };
