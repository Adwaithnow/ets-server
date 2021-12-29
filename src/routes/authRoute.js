const { Router } = require('express');

var AuthRouter = Router();

AuthRouter.get('/login', function(req, res){
   res.send('GET route on things.');
});
AuthRouter.post('/', function(req, res){
   res.send('POST route on things.');
});

module.exports = AuthRouter;