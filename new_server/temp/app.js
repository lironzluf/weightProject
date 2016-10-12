var express = require('express');
var router = express.Router();
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mongoose = require('mongoose');
//mongoose.connect('mongodb://user1:user1@ds057066.mlab.com:57066/mydb');
mongoose.connect('mongodb://weigher:dbpassword@ds153785.mlab.com:53785/weight-project');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('connected');
});

var usersSchema = mongoose.Schema({
    userName: String,
    password: String,
    securityLevel: String
});

var itemsSchema = mongoose.Schema({
    sku: Number,
    itemName: String,
    amount: Number,
    weight: Number,
    location: String
});

var ordersSchema = mongoose.Schema({
    orderNumber: Number,
    sku: Number,
    userName: String,
    amount: Number,
    status : String
});


var Items = mongoose.model('items', itemsSchema);
var Users = mongoose.model('users', usersSchema);
var Orders = mongoose.model('orders', ordersSchema);










app.post('', function (req, res) {
    
    var action = req.body.action;
    
    var arg = req.body.arg;
    
    var arg2 = req.body.arg2;
    
    var itemsArray;
    
    var dataArray;
    
    if (action == "showAllUsers") {
        
        Users.find(function (err, data) {
            if (err) return console.error();
            res.send(data);
        });
    }
    
    else if (action == "showAllUserNames") {
        //return array of strings
        Users.find(function (err, data) {
            if (err) return console.error();
            var usersArray = [];
            for (var i = 0; i < data.length; i++) {
                usersArray.push(data[i].userName);
            }
            res.send(usersArray);
        });
    }

    else if (action == "showUserDetailsByuserName") {

        var query = Users.find({ 'userName': arg });
        
        query.exec(function (err, data) {
            
            if (err) { res.send('error'); console.error(); return; }
            
            res.send(data);
          
        });
    }

    else if (action == "showAllItems") {
        
        Items.find(function (err, data) {
            if (err) return console.error();
            res.send(data);
        });
    }

    else if (action == "showItemByName") {
        
        var query = Items.find({ 'itemName': arg });
        
        query.exec(function (err, data) {
            
            if (err) { res.send('error'); console.error(); return; }
            
            res.send(data);
          
        });
    }

    else if (action == "showItemBySku") {
        
        var query = Items.find({ 'sku': arg });
        
        query.exec(function (err, data) {
            
            if (err) { res.send('error'); console.error(); return; }
            
            res.send(data);
          
        });
    }

    else if (action == "showAllOrders") {
        //return  orderNumber,sku,userName,amount,weight,location
        Items.find(function (err, data) {
            if (err) return console.error();
            itemsArray = data;
            Orders.find(function (err, data) {
                if (err) return console.error();
                dataArray = data;
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
                res.send(dataArray);
            });
        });
       
    }

    else if (action == "showAllOpenOrders") {
        
        
        Items.find(function (err, data) {
            if (err) return console.error();
            itemsArray = data;
            var query = Orders.find({ 'status': '1' });
            query.exec(function (err, data) {
                if (err) { res.send('error'); console.error(); return; }
                dataArray = data;
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
                res.send(dataArray);
            });
        });
    }

    else if (action == "showAllClosedOrders") {
        
        
        Items.find(function (err, data) {
            if (err) return console.error();
            itemsArray = data;
            var query = Orders.find({ 'status': '0' });
            query.exec(function (err, data) {
                if (err) return console.error();
                dataArray = data;
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
                res.send(dataArray);
            });
        });
    }


    else if (action == "showAllOrdersByOrderNumber") {
        
        Items.find(function (err, data) {
            if (err) return console.error();
            itemsArray = data;
            var query = Orders.find({ 'orderNumber': arg });
            query.exec(function (err, data) {
                if (err) return console.error();
                dataArray = data;
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
                res.send(dataArray);
            });
        });
    }

    else if (action == "showAllOpenOrdersByOrderNumber") {
        
        Items.find(function (err, data) {
            if (err) return console.error();
            itemsArray = data;
            var query = Orders.find({ 'orderNumber': arg , 'status': '1' });
            query.exec(function (err, data) {
                if (err) return console.error();
                dataArray = data;
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
                res.send(dataArray);
            });
        });
    }

    else if (action == "showAllCloseOrdersByOrderNumber") {
        
        Items.find(function (err, data) {
            if (err) return console.error();
            itemsArray = data;
            var query = Orders.find({ 'orderNumber': arg , 'status': '0' });
            query.exec(function (err, data) {
                if (err) return console.error();
                dataArray = data;
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
                res.send(dataArray);
            });
        });
    }

    else if (action == "showAllOpenOrderNumber") {
        var query = Orders.find({ 'status': '1' });
        query.exec(function (err, data) {
            if (err) return console.error();
            var OrderNumberArray = [];
            for (var i = 0; i < data.length; i++) {
                var bool = 1;
                for (var j = 0; j < OrderNumberArray.length; j++) {
                    if (OrderNumberArray[j] == data[i].orderNumber) {
                        bool = 0;
                        break;
                    }
                }
                if (bool) {
                    OrderNumberArray.push(data[i].orderNumber);
                }
            }
            res.send(OrderNumberArray);
        });
    }

    else if (action == "showAllOpenOrderNumberByUser") {
        var query = Orders.find({ 'status': '1', 'userName': arg });
        query.exec(function (err, data) {
            if (err) return console.error();
            var OrderNumberArray = [];
            for (var i = 0; i < data.length; i++) {
                var bool = 1;
                for (var j = 0; j < OrderNumberArray.length; j++) {
                    if (OrderNumberArray[j] == data[i].orderNumber) {
                        bool = 0;
                        break;
                    }
                }
                if (bool) {
                    OrderNumberArray.push(data[i].orderNumber);
                }
            }
            res.send(OrderNumberArray);
        });
    }


    else if (action == "getWeightBySkuAndNumberOfItems") {
        //get sku and number of items
        // return string
        var query = Items.find({ 'sku': arg });
        
        query.exec(function (err, data) {
            
            if (err) { res.send('error'); console.error(); return; }
            var num = data[0].weight * parseInt(arg2);
            res.send(num.toString());
        });
    }

    else if (action == "getWeightBySku") {
        //get sku and number of items
        // return object
        var query = Items.find({ 'sku': arg });
        
        query.exec(function (err, data) {
            
            if (err) { res.send('error'); console.error(); return; }
            var num = data[0].weight;
            res.send(num.toString());
        });
    }

    else if (action == "insertNewUser") {
        // get object
        var user = new Users(arg);
        try {
            user.save(function (err, user) {
                if (err || !user) res.send('error');
                res.send('ok');
            });
        }
       catch (e) { };
    }
    else if (action == "insertNewItem") {
        // get object
        var item = new Items(arg);
        try {
            item.save(function (err, user) {
                if (err || !item) res.send('error');
                res.send('ok');
            });
        }
       catch (e) { };
    }
    else if (action == "insertNewOrder") {
        // get object
        var order = new Orders(arg);
        try {
            order.save(function (err, user) {
                if (err || !order) res.send('error');
                res.send('ok');
            });
        }
       catch (e) { };
    }

    else if (action == "deleteUser") {
        Users.remove({ "userName": arg }, function (err) {
            if (!err) {
                res.send('ok');
            }
            else res.send('error');
        });
    }
    else if (action == "deleteOrder") {
        Orders.remove({ "orderNumber": arg }, function (err) {
            if (!err) {
                res.send('ok');
            }
            else res.send('error');
        });
    }
    else if (action == "deleteItemFromOrder") {
        Orders.remove({ "orderNumber": arg, "sku": arg2 }, function (err) {
            if (!err) {
                res.send('ok');
            }
            else res.send('error');
        });
    }
    else if (action == "updateUserByUserName") {
        // arg2 is an object
        var query = { 'userName': arg };
        Users.findOneAndUpdate(query, arg2, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });
    }

    else if (action == "updateOrderByOrderNumber") {
        // arg is object
        // arg2 is an object
        var query = { 'orderNumber': arg.orderNumber, 'sku': arg.sku };
        Orders.findOneAndUpdate(query, arg2, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });
    }

    else if (action == "updateItembySku") {
        // arg2 is an object
        var query = { 'sku': arg };
        Items.findOneAndUpdate(query, arg2, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });
    }
   
  
    else
        res.send("");
           
      
   
});


app.listen(12345);
console.log('Server running');