const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const summyRoute=require("./routes/summy");

const morgan = require('morgan')
app.use(morgan('tiny'))
dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB CONNECTION SUCCCES"))
    .catch((err)=>console.log(err))

app.use("/user",userRoute);
app.use("/auth",authRoute);
app.use("/summy",summyRoute);


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running!");
})