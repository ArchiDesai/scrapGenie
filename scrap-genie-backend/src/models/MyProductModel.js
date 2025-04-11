const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myProductSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "scrapProducts",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myProducts", myProductSchema);
