var express = require('express');
var router = express.Router();
var db = require('../db');
var Promise = require('promise');


router.post('/showallorders', function(req,res){
	 //return all information from orders collection with weight and location from items collection
	var resObj = {status:false};
	db.ItemFunctions.showAllItems()
    .done(function(data){
		var itemsArray = data;
		db.OrderFunctions.showAllOrders()
		.done(function(data){
			resObj.status = true;
			var dataArray = data;
			for (var i = 0; i < dataArray.length; i++) {
				for (var j = 0; j < itemsArray.length; j++) {
					if (dataArray[i].sku == itemsArray[j].sku) {
						var object = {};
						object.orderNumber = dataArray[i].orderNumber;
						object.sku = dataArray[i].sku;
						object.userName = dataArray[i].userName;
						object.amount = dataArray[i].amount;
						object.status = dataArray[i].status;
						object.weight = itemsArray[j].weight;
						object.location = itemsArray[j].location;
						dataArray[i] = object;
						break;
					}
				}
			}
			resObj.data = dataArray;
			res.json(resObj);		
		},function(err){
			res.json(resObj);
		});
    },function(err){
		res.json(resObj);
    });
});

 router.post('/showallopenorders', function(req,res){
	 //return all information from orders collection with weight and location from items collection where the order is open (staus = 1)
	var resObj = {status:false};
	db.ItemFunctions.showAllItems()
    .done(function(data){
		var itemsArray = data;
		db.OrderFunctions.showAllOpenOrders()
		.done(function(data){
			resObj.status = true;
			var dataArray = data;
			for (var i = 0; i < dataArray.length; i++) {
				for (var j = 0; j < itemsArray.length; j++) {
					if (dataArray[i].sku == itemsArray[j].sku) {
						var object = {};
						object.orderNumber = dataArray[i].orderNumber;
						object.sku = dataArray[i].sku;
						object.userName = dataArray[i].userName;
						object.amount = dataArray[i].amount;
						object.status = dataArray[i].status;
						object.weight = itemsArray[j].weight;
						object.location = itemsArray[j].location;
						dataArray[i] = object;
						break;
					}
				}
			}
			resObj.data = dataArray;
			res.json(resObj);		
		},function(err){
			res.json(resObj);
		});
    },function(err){
		res.json(resObj);
    });
});
 
  router.post('/showallclosedorders', function(req,res){
	 //return all information from orders collection with weight and location from items collection where the order is closed (staus = 0)
	var resObj = {status:false};
	db.ItemFunctions.showAllItems()
    .done(function(data){
		var itemsArray = data;
		db.OrderFunctions.showAllClosedOrders()
		.done(function(data){
			resObj.status = true;
			var dataArray = data;
			for (var i = 0; i < dataArray.length; i++) {
				for (var j = 0; j < itemsArray.length; j++) {
					if (dataArray[i].sku == itemsArray[j].sku) {
						var object = {};
						object.orderNumber = dataArray[i].orderNumber;
						object.sku = dataArray[i].sku;
						object.userName = dataArray[i].userName;
						object.amount = dataArray[i].amount;
						object.status = dataArray[i].status;
						object.weight = itemsArray[j].weight;
						object.location = itemsArray[j].location;
						dataArray[i] = object;
						break;
					}
				}
			}
			resObj.data = dataArray;
			res.json(resObj);		
		},function(err){
			res.json(resObj);
		});
    },function(err){
		res.json(resObj);
    });
});

 router.post('/showallordersbyordernumber', function(req,res){
	 //return all information from orders collection with weight and location from items collection by orderNumber
    var orderNumber = req.body.orderNumber;	
	var resObj = {status:false};
	db.ItemFunctions.showAllItems()
    .done(function(data){
		var itemsArray = data;
		db.OrderFunctions.showAllOrdersByOrderNumber(orderNumber)
		.done(function(data){			
			resObj.status = true;			
			var dataArray = data;
			for (var i = 0; i < dataArray.length; i++) {
				for (var j = 0; j < itemsArray.length; j++) {
					if (dataArray[i].sku == itemsArray[j].sku) {
						var object = {};
						object.orderNumber = dataArray[i].orderNumber;
						object.sku = dataArray[i].sku;
						object.userName = dataArray[i].userName;
						object.amount = dataArray[i].amount;
						object.status = dataArray[i].status;
						object.weight = itemsArray[j].weight;
						object.location = itemsArray[j].location;
						dataArray[i] = object;
						break;
					}
				}
			}
			resObj.data = dataArray;
			res.json(resObj);		
		},function(err){
			res.json(resObj);
		});
    },function(err){
		res.json(resObj);
    });
});

 router.post('/showallopenordersbyordernumber', function(req,res){
	 //return all information from orders collection with weight and location from items collection by orderNumber where the order is open (staus = 1)
    var orderNumber = req.body.orderNumber;	
	var resObj = {status:false};
	db.ItemFunctions.showAllItems()
    .done(function(data){
		var itemsArray = data;
		db.OrderFunctions.showAllOpenOrdersByOrderNumber(orderNumber)
		.done(function(data){			
			resObj.status = true;			
			var dataArray = data;
			for (var i = 0; i < dataArray.length; i++) {
				for (var j = 0; j < itemsArray.length; j++) {
					if (dataArray[i].sku == itemsArray[j].sku) {
						var object = {};
						object.orderNumber = dataArray[i].orderNumber;
						object.sku = dataArray[i].sku;
						object.userName = dataArray[i].userName;
						object.amount = dataArray[i].amount;
						object.status = dataArray[i].status;
						object.weight = itemsArray[j].weight;
						object.location = itemsArray[j].location;
						dataArray[i] = object;
						break;
					}
				}
			}
			resObj.data = dataArray;
			res.json(resObj);		
		},function(err){
			res.json(resObj);
		});
    },function(err){
		res.json(resObj);
    });
});


 router.post('/showallcloseordersbyordernumber', function(req,res){
	 //return all information from orders collection with weight and location from items collection by orderNumber where the order is closed (staus = 0)
    var orderNumber = req.body.orderNumber;	
	var resObj = {status:false};
	db.ItemFunctions.showAllItems()
    .done(function(data){
		var itemsArray = data;
		db.OrderFunctions.showAllCloseOrdersByOrderNumber(orderNumber)
		.done(function(data){			
			resObj.status = true;			
			var dataArray = data;
			for (var i = 0; i < dataArray.length; i++) {
				for (var j = 0; j < itemsArray.length; j++) {
					if (dataArray[i].sku == itemsArray[j].sku) {
						var object = {};
						object.orderNumber = dataArray[i].orderNumber;
						object.sku = dataArray[i].sku;
						object.userName = dataArray[i].userName;
						object.amount = dataArray[i].amount;
						object.status = dataArray[i].status;
						object.weight = itemsArray[j].weight;
						object.location = itemsArray[j].location;
						dataArray[i] = object;
						break;
					}
				}
			}
			resObj.data = dataArray;
			res.json(resObj);		
		},function(err){
			res.json(resObj);
		});
    },function(err){
		res.json(resObj);
    });
});

router.post('/showallopenordernumbers', function(req,res){
	 //return all orderNumer from orders collection where the order is open(staus = 1) // return (orderNumer field only)
  var resObj = {status:false};
  db.OrderFunctions.showAllOpenOrders()
    .done(function(data){
		resObj.status = true;
		var dataArray = data;
		var OrderNumberArray = [];
		for (var i = 0; i < dataArray.length; i++) {
			var bool = 1;
			for (var j = 0; j < OrderNumberArray.length; j++) {
				if (OrderNumberArray[j] == dataArray[i].orderNumber) {
					bool = 0;
					break;
				}
			}
			if (bool) {
				OrderNumberArray.push(dataArray[i].orderNumber);
			}
		}		
		resObj.data = OrderNumberArray;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});



router.post('/showallopenordernumberbyusername', function(req,res){
	 //return all orderNumer from orders collection by userName where the order is open(staus = 1) // return (orderNumer field only)
	 
  var userName = req.body.userName;
  var resObj = {status:false};
  db.OrderFunctions.showAllOpenOrderNumberByUserName(userName)
    .done(function(data){
		resObj.status = true;
		var dataArray = data;
		var OrderNumberArray = [];
		for (var i = 0; i < dataArray.length; i++) {
			var bool = 1;
			for (var j = 0; j < OrderNumberArray.length; j++) {
				if (OrderNumberArray[j] == dataArray[i].orderNumber) {
					bool = 0;
					break;
				}
			}
			if (bool) {
				OrderNumberArray.push(dataArray[i].orderNumber);
			}
		}		
		resObj.data = OrderNumberArray;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/insertneworder', function(req,res){
	 //insert new order	 
  var order = {"orderNumber" : req.body.orderNumber , "sku" : req.body.sku , "userName" : req.body.userName,"amount" : req.body.amount,"status" : req.body.status}
  var resObj = {status:false};
  db.OrderFunctions.insertNewOrder(order)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/deleteorder', function(req,res){
	 //delete order
  var orderNumber = req.body.orderNumber;
  var resObj = {status:false};
  db.OrderFunctions.deleteOrder(orderNumber)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/deleteitemfromorder', function(req,res){
	 //delete item from order
  var orderNumber = req.body.orderNumber;
  var sku = req.body.sku;
  var resObj = {status:false};
  db.OrderFunctions.deleteItemFromOrder(orderNumber,sku)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/updateorderitem', function(req,res){
	 //update one item from order collection 
  var order = {"orderNumber" : req.body.orderNumber , "sku" : req.body.sku , "userName" : req.body.userName,"amount" : req.body.amount,"status" : req.body.status}
  var resObj = {status:false};
  db.OrderFunctions.updateOrderItem(order)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

router.post('/multiupdateorder', function(req,res){
	 //multiple update for order collection // change status
  var order = {"orderNumber" : req.body.orderNumber ,"status" : req.body.status}
  var resObj = {status:false}; 
  db.OrderFunctions.multiUpdateOrder(order)
    .done(function(data){
		resObj.status = true;		
		resObj.data = data;
		res.json(resObj);
    },function(err){
		res.json(resObj);
    });
});

module.exports = router;