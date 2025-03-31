const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    issueCategory: {
      type: String,
      enum: ["Transaction Issue", "Account Problem", "General Inquiry"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Open", "Resolved", "Closed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("supports", supportSchema);
