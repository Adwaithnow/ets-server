const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URL || '');

const app = express();
app.get('/', (req,res)=>{
    res.send('text-transform-server')
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
routes(app);

module.exports = app;