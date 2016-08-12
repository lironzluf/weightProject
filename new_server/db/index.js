var mongoose = require('mongoose');
mongoose.connect('mongodb://weigher:dbpassword@ds153785.mlab.com:53785/weight-project');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to mongolab database');
});

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