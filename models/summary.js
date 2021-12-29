const { timeStamp } = require("console");
const mongoose=require("mongoose");
const { boolean } = require("webidl-conversions");

const SummarySchema= new mongoose.Schema (
    {
        title:{ type: String, required:true},
        summary:{ type: String,required:true},
    }
    ,{timestamps:true}
);
module.exports=mongoose.model("Summy",SummarySchema)