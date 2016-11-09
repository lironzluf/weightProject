/**
 * Created by lzluf on 10/10/16.
 */
var express = require('express');
var router = express.Router();
var db = require('../db');
var Promise = require('promise');
var md5 = require("blueimp-md5");


router.post('/login', function(req,res){
  console.info('new login request!');
  var userName = req.body.userName;
  var password = req.body.password;
  var hash = md5(password);
  console.log('userName: ' + userName + ', password: ' + password);
  var resObj = {status:false};
  db.UserFunctions.getUserLogin(userName,hash)
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
  db.UserFunctions.getUserById(userId)
    .done(function(user){
      resObj.status = true;
      resObj.user = user;
      res.json(resObj);
    },function(err){
      res.json(resObj);
    });
});

router.post('/loginbynfc', function(req,res){
  console.info('new login request! (by nfc!!!)');
  var nfc = req.body.nfc;
  var resObj = {status:false};
  db.UserFunctions.getUserLoginByNFC(nfc)
    .done(function(user){
    resObj.status = true;
    resObj.user = user;
    res.json(resObj);
  },function(err){
    res.json(resObj);
  });
});

 router.post('/showallusers', function(req,res){
	 //return all information from users collection
  var resObj = {status:false};
  db.UserFunctions.showAllUsers()
    .done(function(data){
		resObj.status = true;	
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});


router.post('/showallusernames', function(req,res){
	 //return all userNames from users collection // (userNames field only)
  var resObj = {status:false};
  db.UserFunctions.showAllUsers()
    .done(function(data){
		resObj.status = true;
		var usersArray = [];
		for (var i = 0; i < data.length; i++) {
			usersArray.push(data[i].userName);
		}
		resObj.data = usersArray;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});


router.post('/showuserdetailsbyusername', function(req,res){
	 //return all information from users collection by userName
  var userName = req.body.userName;
  var resObj = {status:false};
  db.UserFunctions.showUserDetailsByUserName(userName)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/insertnewuser', function(req,res){
	 //insert new user	
  var user = {"userName" : req.body.userName, "password" : md5(req.body.password), "securityLevel" : req.body.securityLevel,"nfc" : req.body.nfc};
  var resObj = {status:false};
  db.UserFunctions.insertNewUser(user)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/deleteuser', function(req,res){
	 //delete user
  var userName = req.body.userName;
  var resObj = {status:false};
  db.UserFunctions.deleteUser(userName)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/updateuserbyusername', function(req,res){
	 //update username 
  var user = {"userName" : req.body.userName, "password" :  md5(req.body.password), "securityLevel" : req.body.securityLevel,"nfc" : req.body.nfc};
  var resObj = {status:false};
  db.UserFunctions.updateUserByUserName(user)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
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
