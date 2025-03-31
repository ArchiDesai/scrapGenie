const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapProductSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
    productName: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Metal", "Plastic", "Paper", "E-Waste", "Vehicle Parts"],
      // required: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
      // required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "states",
      // required: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      // required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: "areas",
      // required: true,
    },
    status: {
      enum: ["Available", "Sold"],
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("scrapProducts", scrapProductSchema);
