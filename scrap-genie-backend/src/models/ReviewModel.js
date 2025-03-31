const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewerId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    reviewedId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    rating:{
        type:Number
    },
    reviewComment:{
        type:String
    }
}, { timestamps: true });

module.exports=mongoose.model("reviews",reviewSchema)