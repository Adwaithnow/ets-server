const router = require("express").Router();
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const { verifyTokenAuthazrization } = require("./verifyToken");
const { spawn } = require('child_process');


router.put(
    '/', verifyTokenAuthazrization,
    (req, res) => {
        try {
            let extracted = '';
            let myextracted = {};
            if (req.files) {
                console.log(req.files.file.name, 'koko');
                const tmpl = req.files.file.name.split('.')
                const extension = tmpl[tmpl.length - 1]
                const filename = uuidv1() + "." + extension
                req.files.file.mv('./data/' + filename)
                const paths = './data/' + filename
                const child = spawn('python', ['./python/ExtractText.py', paths]);
                child.stdout.on('data', (data) => {
                    extracted = data.toString();
                    // console.log(filename, extracted)
                    myextracted = JSON.parse(extracted).data
                    if (fs.existsSync(paths)) {
                        fs.unlink(paths, function (err) {
                            if (err) throw err;
                            // res.status(200).send("DELETED")
                        });
                    }
                    res.status(200).send({ myextracted })
                });
            }
            else {
                res.status(500).send({ "message": "NO FILE ERROR" })
            }

        } catch (error) {
            res.status(500).send({ "message": error.toString() })
        }
    }
)
module.exports = router






/*

            // const filetemp=uuidv1();
            // const file=req.files.file;
            // const mime=file.mimetype;
            // const index=mime.indexOf("/")+1;
            // console.log(file.name);

            
            // const extension=mime.slice(index);
*/