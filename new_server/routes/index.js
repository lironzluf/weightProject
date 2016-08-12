var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** Liron:
 *  Here goes all the routes
 *  Please note that no logic should go here,
 *  this module only handles the route event
 *  */


module.exports = router;
