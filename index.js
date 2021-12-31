//importing  libraries
const express=require("express");
const fileUpload = require("express-fileupload")
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
//importing routes
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const summyRoute=require("./routes/summy");
const extractRoute=require("./routes/extract");

dotenv.config();
const morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json());
app.use(fileUpload({
    useTempFiles : false,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
}));
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB CONNECTION SUCCCES"))
    .catch((err)=>console.log(err))

app.use("/user",userRoute);
app.use("/auth",authRoute);
app.use("/summy",summyRoute);
app.use("/extracttext",extractRoute);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running!");
})