const router=require("express").Router();
const {v1: uuidv1} = require('uuid');
const { verifyTokenAuthazrization } = require("./verifyToken");
const { spawn } = require('child_process');
const { json } = require("express/lib/response");


router.put(
    '/',verifyTokenAuthazrization,
     (req, res) => {
        try {
            let summary = '';
        let mysummary={};
        if(req.files){
            // console.log(req.files, 'koko');
            // const filetemp=uuidv1();
            const file=req.files.file;
            const mime=file.mimetype;
            const index=mime.indexOf("/")+1;
            // console.log(file.name);
            // const tmpl = req.files.file.name.split('.')
            // const extension = tmpl[tmpl.length-1]
            const extension=mime.slice(index);
            const filename=uuidv1()+"."+extension
            req.files.file.mv('./data/'+filename)
            // console.log(filename)
            const child = spawn('python3',['./python/ExtractText.py','../data/'+filename]);
            child.stdout.on('data', (data) => {
                 summary = data.toString();
                //parse
                mysummary=JSON.parse(summary).data
                res.status(200).send({ mysummary })
              });
        }
        else{
            res.status(500).send({ "message":"ERROR" })
        }
            
        } catch (error) {
            res.status(500).send({ "message":"ERROR" })
        }
    }
)
module.exports=router




