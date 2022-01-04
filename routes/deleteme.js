//prototyping only not related to original code
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const router=require("express").Router();
const { verifyTokenAuthazrization } = require("./verifyToken");
const { spawn } = require('child_process');
const { json } = require('express/lib/response');
router.put(
    '/',verifyTokenAuthazrization,
     (req, res) => {
        // let summary = '';
        // let mysummary = {};
        // const texttofile=req.body.summary
        // const filename = uuidv1() + "." + "txt"
        // const paths = './data/text/' + filename
        // console.log(paths);
        // fs.appendFile(paths, texttofile, function (err) {
        //     if (err) throw err;
        //     console.log('Saved!',err);
        //   }); 
        //   const child = spawn('python', ['./python/summy.py', paths]);
        //         child.stdout.on('data', (data) => {
        //             summary = data.toString();
        //             console.log(filename, summary)
        //             mysummary = JSON.parse(summary).data
        //             if (fs.existsSync(paths)) {
        //                 fs.unlink(paths, function (err) {
        //                     if (err) throw err;
        //                     res.status(200).send("DELETED")
        //                 });
        //             }
        //             // res.status(200).send({ mysummary })
        //         });
        
    
    }
)
module.exports=router

