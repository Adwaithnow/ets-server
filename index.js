const express=require("express");
const fileUpload = require("express-fileupload")
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const summyRoute=require("./routes/summy");
const {v1: uuidv1} = require('uuid');
const { verifyTokenAuthazrization } = require("./routes/verifyToken");

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

app.post(
    '/test/file-upload',verifyTokenAuthazrization,
    (req, res) => {
        if(req.files){
            console.log(req.files, 'koko');
            const filetemp=uuidv1();
            const tmpl = req.files.file.name.split('.')
            const extension = tmpl[tmpl.length-1]
            req.files.file.mv('./data/'+filetemp + '.' + extension)
        }
        res.send('ok')
    }
)


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running!");
})