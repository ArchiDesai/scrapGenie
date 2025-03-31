const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communicationSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "scrapProducts",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("communications", communicationSchema);
