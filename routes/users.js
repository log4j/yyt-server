var express = require('express');
var router = express.Router();
var db = require('./db.js');

/* GET users listing. */
router.get('/', function(req, res) {
    var artist = db.get('art');
    artist.findOne({},function(e,doc){
        //res.send(JSON.stringify(docs));
        
        res.jsonp(doc);
    });
});

module.exports = router;
