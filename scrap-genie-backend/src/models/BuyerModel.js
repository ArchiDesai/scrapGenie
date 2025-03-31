const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  category: {
    type: String,
    enum: ["Metal", "Plastic", "Paper", "Electronics", "Other"],
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: "states",
  },
  minQuantity: {
    type: String,
  },
  maxPrice: {
    type: String,
  },
});

module.exports = mongoose.model("buyers", buyerSchema);
