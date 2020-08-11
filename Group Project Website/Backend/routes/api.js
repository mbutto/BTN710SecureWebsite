const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose'); 
const user = require('../models/user');
const e = require('express');
const db = "mongodb://viewuser:viewuser123@ds359868.mlab.com:59868/securewebsiteuserdb";

mongoose.connect(db, err =>{
    if(err){
        console.log(err);
    } else {
        console.log("connected to db")
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.get('/home', verifyToken, function(req, res){
    let logged = [
        {
          "logged": "true",
        }]

    res.json(logged);
});

router.get('/', verifyToken, function(req, res){
    let logged = true;

    res.json(logged);
});

router.post('/register', (req, res) => {
    let userData = req.body
    let newUser = new user(userData)
    newUser.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  })

router.post('/login', (req, res)=>{
    let userData = req.body;
    
    user.findOne({username: userData.username}, (error, user) =>{
        if(error){
            console.log(error);
        } else {
            if(!user){
                res.status(401).send("User not found");
            } else {
                if(user.password !== userData.password){
                    res.status(401).send("Invalid username or password");
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

module.exports = router;