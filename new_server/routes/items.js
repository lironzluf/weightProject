var express = require('express');
var router = express.Router();
var db = require('../db');
var Promise = require('promise');

router.post('/login', function(req,res){
  console.info('new login request!');
  var userName = req.body.userName;
  var password = req.body.password;
  console.log('userName: ' + userName + ', password: ' + password);
  var resObj = {status:false};
  db.UserFunctions.getUserLogin(userName,password)
    .done(function(user){
      resObj.status = true;
      resObj.user = user;
      res.json(resObj);
    },function(err){
      res.json(resObj);
    });
});