//importing  libraries
const express=require("express");
const fileUpload = require("express-fileupload")
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors = require('cors')
//importing routes
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const summyRoute=require("./routes/summy");
const extractRoute=require("./routes/extract");
const deletemeRoute=require("./routes/deleteme.js");


dotenv.config();
const morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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
app.use("/deleteme",deletemeRoute);


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running!");
})
