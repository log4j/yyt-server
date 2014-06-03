var express = require('express');
var router = express.Router();

var db = require('./db.js');

/* GET home page. */
router.get('/:id', function(req, res) {
    
    var para = new Object();
    console.log(req.param('id'));
    para.id = parseInt(req.param('id'));
    var artist = db.get('artist');
    artist.findOne(para,function(e,doc){
        res.render('artist-detail', {artist:doc});
    });

  
});

router.get('/', function(req, res) {
    var artist = db.get('artist');
    artist.find({}).sort({id:1}).success(function(e,docs){
        res.render('artist', { title: 'Artists',artists:docs});
    });
    /*artist.find({},{id:1},function(e,docs){
        res.render('artist', { title: 'Artists',artists:docs});
    });*/
});

module.exports = router;