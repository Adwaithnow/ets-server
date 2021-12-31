const req = require("express/lib/request");
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

const router=require("express").Router();
//UPDATE USER
router.put("/:id",verifyToken,async (req,res)=>{
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