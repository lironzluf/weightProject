/**
 * Created by lzluf on 10/10/16.
 */
var express = require('express');
var router = express.Router();
var db = require('../db');
/* GET home page. */
router.get('/', function(req, res, next) {

});

router.post('/login', function(req,res){
  console.info('new login request!');
  var userId = req.body.userId;
  var password = req.body.password;
  console.log('userId: ' + userId + ', password: ' + password);
  var resObj = {status:false};
  if (db.getUserLogin(userId,password)) {
    res.status(200);
  }
  else {
    res.status(500);
  }
});

/** Liron:
 *  Here goes all the routes
 *  Please note that no logic should go here,
 *  this module only handles the route event
 *  */


module.exports = router;
