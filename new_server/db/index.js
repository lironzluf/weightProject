var mongoose = require('mongoose');
var Promise = require('promise');
mongoose.connect('mongodb://weigher:dbpassword@ds153785.mlab.com:53785/weight-project');

var db = mongoose.connection;

var usersSchema = mongoose.Schema({
  userName: String,
  password: String,
  securityLevel: String,
  nfc: String
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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // connected!
  console.log('connected to mongolab database');
});

module.exports = {

  UserFunctions: {
    getUserTasks: function (userId) {

    },

    getUserLogin: function (userName, password) {
      /*Users.find(function (err,users){
       if (err) return console.error();
       console.log(users);
       });*/
      return new Promise(function (resolve, reject) {
        var query = Users.findOne({'userName': userName, 'password': password});

        query.exec(function (err, user) {
          if (err) {
            console.log(err);
            reject(err);
          }
          if (user != null) {
            resolve(user);
          }
          else {
            reject("No matching user found");
          }
        });
      });
    },

    getUserById: function (userId) {
      return new Promise(function (resolve, reject) {
         var query = Users.findOne({'_id': userId});

         query.exec(function (err, user) {
          if (err) {
            console.log(err);
            reject(err);
          }
          if (user != null) {
            resolve(user);
          }
          else {
            reject("No matching user found");
          }
        });
      });
    },
	
	getUserLoginByNFC: function (nfc) {      
      return new Promise(function (resolve, reject) {
        var query = Users.findOne({'nfc': nfc});

        query.exec(function (err, user) {
          if (err) {
            console.log(err);
            reject(err);
          }
          if (user != null) {
            resolve(user);
          }
          else {
            reject("No matching user found");
          }
        });
      });
    },
	
	showAllUsers: function() {	  
     return new Promise(function (resolve, reject) {
		var query = Users.find();

		query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {
		  resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
	 });
	},  
  
    showUserDetailsByUserName: function(arg) {		
     return new Promise(function (resolve, reject) {
       var query = Users.find({ 'userName': arg });

       query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {
		  resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
  insertNewUser: function(arg) {		
     return new Promise(function (resolve, reject) {		 
	   var user = new Users(arg);
		try {
			user.save(function (err, user) {
				if (err || !user){
					console.log(err);
					reject(err);
				}
				resolve('ok');
			});
		}
	   catch (e) { };      
    });
  },
  deleteUser: function(arg) {		
     return new Promise(function (resolve, reject) {
		Users.remove({ "userName": arg }, function (err) {
            if (!err) {
                resolve('ok');
            }
            else {
				console.log(err);
				reject(err);
			}
        });	
    });
  },
  updateUserByUserName: function(arg) {		
     return new Promise(function (resolve, reject) {
		var query = { 'userName': arg.userName };
		  Users.findOneAndUpdate(query, arg, { upsert: true }, function (err, doc) {
            if (!err) {
                resolve('ok');
            }
            else {
				console.log(err);
				reject(err);
			}
        });	
    });
  }
  },
  
  ItemFunctions: {	  
	showAllItems: function() {		
     return new Promise(function (resolve, reject) {
      var query = Items.find();

      query.exec(function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data != null) {
          resolve(data);
        }
        else {
          reject("No matching data found");
        }
      });
     });
	},
  
    showItemByItemName: function(arg) {		
     return new Promise(function (resolve, reject) {
      var query = Items.find({ 'itemName': arg });

      query.exec(function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data != null) {
          resolve(data);
        }
        else {
          reject("No matching data found");
        }
      });
     });
	},  
  
   showItemBySku: function(arg) {		
     return new Promise(function (resolve, reject) {
      var query = Items.find({ 'sku': arg });

      query.exec(function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data != null) {
          resolve(data);
        }
        else {
          reject("No matching data found");
        }
      });
    });
  },
	getWeightBySku: function(arg) {		
		 return new Promise(function (resolve, reject) {
		  var query = Items.find({ 'sku': arg });

		  query.exec(function (err, data) {
			if (err) {
			  console.log(err);
			  reject(err);
			}
			if (data != null) {			
			  resolve(data);
			}
			else {
			  reject("No matching data found");
			}
		  });
		});
	  },
	  insertNewItem: function(arg) {		
		 return new Promise(function (resolve, reject) {		 
		   var item = new Items(arg);
			try {
				item.save(function (err, user) {
					if (err || !user){
						console.log(err);
						reject(err);
					}
					resolve('ok');
				});
			}
		   catch (e) { };      
		});
	  },
	updateItemBySku: function(arg) { 		
		 return new Promise(function (resolve, reject) {
			var query = { 'sku': arg };
			Items.findOneAndUpdate(query, arg, { upsert: true }, function (err, doc) {
				if (!err) {
					resolve('ok');
				}
				else {
					console.log(err);
					reject(err);
				}
			});	
		});
	  }	  
  },
  
  OrderFunctions: {
	showAllOrders: function() {		
     return new Promise(function (resolve, reject) {
      var query = Orders.find();

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {						
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
  
   showAllOpenOrders: function() {		
     return new Promise(function (resolve, reject) {
      var query = Orders.find({ 'status': '1' });

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {						
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
  
    showAllClosedOrders: function() {		
      return new Promise(function (resolve, reject) {
      var query = Orders.find({ 'status': '0' });

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {						
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
  
  showAllOrdersByOrderNumber: function(arg) {		
	 return new Promise(function (resolve, reject) {
      var query = Orders.find({ 'orderNumber': arg });

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {			
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },

   showAllOpenOrdersByOrderNumber: function(arg) {		
    	 return new Promise(function (resolve, reject) {
      var query = Orders.find({ 'orderNumber': arg, 'status': '1' });

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {						
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
  
   showAllCloseOrdersByOrderNumber: function(arg) {		
   	 return new Promise(function (resolve, reject) {
      var query = Orders.find({ 'orderNumber': arg, 'status': '0' });

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {						
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
  
  showAllOpenOrderNumberByUserName: function(arg) {		
    	 return new Promise(function (resolve, reject) {
      var query = Orders.find({ 'userName': arg, 'status': '1' });

	  query.exec(function (err, data) {
		if (err) {
		  console.log(err);
		  reject(err);
		}
		if (data != null) {						
			resolve(data);
		}
		else {
		  reject("No matching data found");
		}
	  });
    });
  },
   insertNewOrder: function(arg) {		
     return new Promise(function (resolve, reject) {		 
	   var order = new Orders(arg);
		try {
			order.save(function (err, user) {
				if (err || !user){
					console.log(err);
					reject(err);
				}
				resolve('ok');
			});
		}
	   catch (e) { };      
    });
  },
  deleteOrder: function(arg) {		
     return new Promise(function (resolve, reject) {
		 Orders.remove({ "orderNumber": arg }, function (err) {
            if (!err) {
                resolve('ok');
            }
            else {
				console.log(err);
				reject(err);
			}
        });	
    });
  },
  deleteItemFromOrder: function(arg,arg2) {		
     return new Promise(function (resolve, reject) {
		 Orders.remove({ "orderNumber": arg, "sku": arg2 }, function (err) {
            if (!err) {
                resolve('ok');
            }
            else {
				console.log(err);
				reject(err);
			}
        });	
    });
  },
   updateOrderItem: function(arg) { 		
     return new Promise(function (resolve, reject) {
		var query = { 'orderNumber': arg.orderNumber, 'sku': arg.sku };
          Orders.findOneAndUpdate(query, arg, { upsert: true }, function (err, doc) {
            if (!err) {
                resolve('ok');
            }
            else {
				console.log(err);
				reject(err);
			}
        });	
    });
  },
   multiUpdateOrder: function(arg) { 		
     return new Promise(function (resolve, reject) {
		var query = { 'orderNumber': arg.orderNumber};
        Orders.update(query, arg, {multi: true}, function (err, doc) {
            if (!err) {
				
                resolve('ok');
            }
            else {
				console.log(err);
				reject(err);
			}
        });	
    });
  }  
  }
  
};