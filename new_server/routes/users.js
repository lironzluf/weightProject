/**
 * Created by lzluf on 10/10/16.
 */
var express = require('express');
var router = express.Router();
var db = require('../db');
var Promise = require('promise');
/* GET home page. */
router.get('/', function(req, res, next) {

});

router.post('/login', function(req,res){
  console.info('new login request!');
  var userName = req.body.userName;
  var password = req.body.password;
  console.log('userName: ' + userName + ', password: ' + password);
  var resObj = {status:false};
  db.getUserLogin(userName,password)
    .done(function(user){
    resObj.status = true;
    resObj.user = user;
    res.json(resObj);
  },function(err){
    res.json(resObj);
  });
});

router.post('/loginbyid', function(req,res){
  console.info('new login request!');
  var userId = req.body.userId;
  console.log('userId: ' + userId);
  var resObj = {status:false};
  db.getUserById(userId)
    .done(function(user){
      resObj.status = true;
      resObj.user = user;
      res.json(resObj);
    },function(err){
      res.json(resObj);
    });
});

/** Liron:
 *  Here goes all the routes
 *  Please note that no logic should go here,
 *  this module only handles the route event
 *  */


module.exports = router;
