var express = require('express');
var router = express.Router();
var db = require('../db');
var Promise = require('promise');

router.post('/showallitems', function(req,res){
	 //return all information from items collection
  var resObj = {status:false};
  db.ItemFunctions.showAllItems()
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/showitembyitemname', function(req,res){
	 //return all information from items collection by itemName
  var itemName = req.body.itemName;
  var resObj = {status:false};
  db.ItemFunctions.showItemByItemName(itemName)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});


 router.post('/showitembysku', function(req,res){
	 //return all information from items collection by sku
  var sku = req.body.sku;
  var resObj = {status:false};
  db.ItemFunctions.showItemBySku(sku)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/getweightbysku', function(req,res){
	 //return weight of item by sku
	 
  var sku = req.body.sku;
  var resObj = {status:false};
  db.ItemFunctions.getWeightBySku(sku)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data[0].weight.toString();
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/insertnewitem', function(req,res){
	 //insert new item
  var item = {"sku" : req.body.sku, "itemName" : req.body.itemName , "amount" : req.body.amount, "weight" : req.body.weight, "location" : req.body.location}
  var resObj = {status:false};
  db.ItemFunctions.insertNewItem(item)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/updateitembysku', function(req,res){
	 //update item from item collection 
  var item = {"sku" : req.body.sku, "itemName" : req.body.itemName , "amount" : req.body.amount, "weight" : req.body.weight, "location" : req.body.location}
  var resObj = {status:false};
  db.ItemFunctions.updateItemBySku(item)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

module.exports = router;