const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    profileImage: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    roleId: {
      enum: ["Seller", "Buyer"],
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: "areas",
      required: true,
    },
    verificationStatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
