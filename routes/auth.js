const router=require("express").Router();
const User =require("../models/User")
const CryptoJS=require("crypto-js");

//json web token init
const jwt=require("jsonwebtoken");
// const req = require("express/lib/request");
// const res = require("express/lib/response");


//Register
router.post("/register",async (req,res)=>{
        //  const tst=User.findOne({username: "Adwaithnow"})
         const newUser=new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        }
    );
    reg: try {
        const dup=await User.findOne({ $or:[{username: req.body.username},{email : req.body.email}]})
        if(!dup)
        {
            const savedUSer= await newUser.save()
            res.status(201).json(savedUSer);
        }
        else{
            res.status(409).json("Email id or Password already exist")
    }
       
    } catch (error) {
        res.status(500).json(error.message || "Somethinge Went wrong");
    }
    
});

//Login
router.post('/login', async (req, res) => {
    try{
        const user=await User.findOne({
            username:req.body.username
        });
        if(!user)
        {
            return res.status(401).send("Wrong Credentials");
        }
        else
        {
            const hasedPassword=CryptoJS.AES.decrypt(user.password,process.env.SECRET);
            const Originalpassword=hasedPassword.toString(CryptoJS.enc.Utf8);
            const {password,...others}=user._doc
            if(Originalpassword!==req.body.password)
            {
                return res.status(401).send("Wrong Credentials");
            }
            else{
                const accessToken=jwt.sign(
                    {
                        id:user._id,
                        isAdmin:user.isAdmin
                    },
                    process.env.JWT_KEY,
                    {expiresIn:"3d"}
                )
                return res.status(200).send({...others,accessToken});
            }
        }

    }catch(err){
        res.status(500).json(err);
    }
});


module.exports=router