const req = require("express/lib/request");
const User = require("../models/User");
const SummyModel = require('../models/summary')
const { verifyTokenAuthazrization } = require("./verifyToken");

const router=require("express").Router();

//GET SUMMARY
router.get('/history/summary', verifyTokenAuthazrization, async (req, res) => {
  try {
    const summyHistory = await SummyModel.find(
      {
        user: req.user.id,
      }
    ).limit(5);
    res.send(summyHistory);
  } catch (error) {
    res.status(500).json(error)
  }
})

//UPDATE USER DETAILS
router.put("/:id",verifyTokenAuthazrization ,async (req,res)=>{
  if(req.body.password)
  {
    req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
  }
  try {
      const updatedUser=await User.findByIdAndUpdate(req.params.id,{
          $set :req.body
      },{new:true})
      const {password,...others}=updatedUser._doc
      res.status(200).json(others);
  } catch (error) {
      res.status(500).json(error)
  }
})

module.exports=router