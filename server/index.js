var http=require('http');
var express=require('express');
const bodyParser = require('body-parser');
var appRoutes=require('./routes/appRoutes.js');
var port=process.env.PORT || 3400;
var app=express();
var mongoose=require('mongoose');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



mongoose.connect('mongodb://localhost:27017/blooddonation',{ useNewUrlParser: true });




app.use('/',appRoutes);

http.createServer(app).listen(port);

console.log("Backend running on port ",port);