const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pickupSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "transactions",
  },
  pickupTime: {
    type: Date,
  },
  trackingStatus: {
    typeof: String,
    enum: ["Scheduled", "In Transit", "Completed"],
  },
});

module.exports = mongoose.model("pickups", pickupSchema);
