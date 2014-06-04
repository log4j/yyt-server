var express = require('express');
var router = express.Router();
var model = require('../models/model.js');

var db = require('./db.js');

/* GET home page. */
router.get('/:id', function(req, res) {
    var id = req.param('id');
    model.Artist.findById(id,function(e,doc){
        if(req.query && req.query.callback){
            res.jsonp(doc);
        }
        else{
            res.render('artist-detail', {artist:doc});
        }
        
    });

  
});

router.get('/', function(req, res) {
    
    model.Artist.find({},null,function(e,artists){
        if(req.query && req.query.callback)
            res.jsonp(artists);
        else
            res.render('artist', { title: 'Artists',artists:artists});
    });
});

module.exports = router;