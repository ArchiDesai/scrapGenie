const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "scrapProducts",
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "buyers",
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "UPI", "Bank Transfer", "Digital Wallet"],
    },
    amount: {
      type: Number,
    },
    transactionStatus:{
        type:String,
        enum:['Pending', 'Completed', 'Cancelled']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", transactionSchema);
