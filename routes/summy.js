const summary = require("../models/summary");
const { verifyTokenAuthazrization } = require("./verifyToken");

const router=require("express").Router();
//Testmodule
router.post("/test",(req,res)=>
{
    res.send("working")
})
//SummaryintoDB
router.post("/",verifyTokenAuthazrization,async (req,res)=>{
     const newsummy=new summary(
    {
        title: req.body.title,
        summary: req.body.summary,
    }
);
try {
    const savedSummy= await newsummy.save()
    res.status(201).json(savedSummy);
   } catch (error) {
    res.status(500).json(error.message || "Somethinge Went wrong");
}
});

module.exports=router