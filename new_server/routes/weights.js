
var express = require('express');
var router = express.Router();
var db = require('../db');
var Promise = require('promise');

<<<<<<< HEAD
router.post('/insertnewweight', function(req,res){
	 //insert new weight
  var weight = {"userName" : req.body.userName, "date" : req.body.date, "weight" : req.body.weight,"latitude" : req.body.latitude,"longitude" : req.body.longitude}
  var resObj = {status:false};
  db.weightFunctions.insertNewWeight(weight)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
=======
router.post('/insertnewweight', function (req, res) {
  //insert new weight
  var weight = {
    "userName": req.body.userName,
    "date": req.body.date,
    "weight": req.body.weight,
    "latitude": req.body.latitude,
    "longitude": req.body.longitude
  };
  var resObj = {status: false};
  db.weightFunctions.insertNewWeight(weight)
    .done(function (data) {
      resObj.status = true;
      resObj.data = data;
      res.json(resObj);
    }, function (err) {
      res.json(resObj);
>>>>>>> 346e051a259d8e7b424d04b73f3eb150c7b27a04
    });
});

router.post('/deleteweight', function(req,res){
	 //delete weight
  var userName = req.body.userName;
  var date = req.body.date;
  var resObj = {status:false};
  db.weightFunctions.deleteWeight(userName,date)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/showallweightsbyusername', function(req,res){
	 //return all information from weights collection by userName
  var userName = req.body.userName;
  var resObj = {status:false};
  db.weightFunctions.showAllWeightsByUserName(userName)
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
