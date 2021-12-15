const { Router } = require('express');
const exec = require('child_process').exec;

var TextRouter = Router();

TextRouter.get('/', function(req, res){
   res.send('GET route on things.');
});
TextRouter.post('/', function(req, res){
   res.send('POST route on things.');
});
TextRouter.post('/convert', (req, res) => {
    // if(req.user.idnam ema ) {}
    // write to input file 
    const uniquifilename =''
    const cmdStr = `python python/main.py data/${uniquifilename}`;
    exec(cmdStr, (err, stdout, stderr) => {
        if(err) console.log(err.code);
        if(stderr) console.log(stderr);
        else res.send({'data':`${stdout}`});
      });
});

module.exports = TextRouter;