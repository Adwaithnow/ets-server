const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const SummarySchema= new mongoose.Schema (
    {
        title:{ type: String, required:true},
        summary:{ type: String,required:true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "CouponType",
        }
    }
    ,{timestamps:true}
);
module.exports=mongoose.model("Summy",SummarySchema)