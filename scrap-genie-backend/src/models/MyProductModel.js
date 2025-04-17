const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myProductSchema = new Schema(
  {
    // productName: {
    //   type: String,
    // },

    // category: {
    //   type: String,
    // },

    // price: {
    //   type: String,
    // },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "scrapProducts",
    },

    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myProducts", myProductSchema);
