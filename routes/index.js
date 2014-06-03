var express = require('express');
var router = express.Router();

var db = require('./db.js');

/* GET home page. */
router.get('/', function(req, res) {
    
    
    var user = db.get('user');
    user.find({},{},function(e,docs){
        res.render('index', { title: 'Express',users:docs});
    });
  
});

module.exports = router;
