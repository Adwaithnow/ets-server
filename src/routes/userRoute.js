const { Router } = require('express');

var UserRouter = Router();

UserRouter.get('/', function(req, res){
   res.send('GET route on things.');
});
UserRouter.post('/', function(req, res){
   res.send('POST route on things.');
});

module.exports = UserRouter;