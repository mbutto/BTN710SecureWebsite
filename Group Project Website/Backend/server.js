const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const api = require('./routes/api')
const app = express();

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function(req, res){
    res.send("hello");
});

app.listen(PORT, function(req, res){
    console.log("server running");
});