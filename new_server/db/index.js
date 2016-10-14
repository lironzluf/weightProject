var mongoose = require('mongoose');
var Promise = require('promise');
mongoose.connect('mongodb://weigher:dbpassword@ds153785.mlab.com:53785/weight-project');

var db = mongoose.connection;

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
    }
  },
  ItemFunctions: {},
  OrderFunctions: {}
};

/** Liron:
 *  Here goes all the database queries and the definition of the schemes
 *  example definition for a users scheme:
 *  var usersSchema = mongoose.Schema({
      userName: String,
      password: String
    });

    handling a user login:
    ----------------------------
     var query = Users.findOne({'userName': username, 'password': password});

     query.exec(function(err,user){
        if (err) {res.send('error'); console.error(); return;}
        //console.log(user);
        if (user)
          res.send('ok');
        else
          res.send('error');
      });

    getting all users:
     Users.find(function (err,users){
        if (err) return console.error();
        res.send(users);
      });

    inserting new user:
       var user = new Users(req.body.gameRecord);
       console.log(user);
       //console.log('error');
       try {
          user.save(function (err, user) {
            if (err || !user) res.send('error');
            res.send('ok');
          });
        }
       catch (e) {};
 */
