var express = require('express');
var router = express.Router();

var db = require('./db.js');

/* GET home page. */
router.get('/:id', function(req, res) {
    
    var para = new Object();
    console.log(req.param('id'));
    para.category = parseInt(req.param('id'));
    var art = db.get('art');
    art.find(para,function(e,docs){
        res.render('list-detail', {arts:docs});
    });

  
});

router.get('/', function(req, res) {
    var cateDB = db.get('category');
    cateDB.find({},function(e,docs){
        res.render('list', { title: 'Category',cates:docs});
    });
    /*artist.find({},{id:1},function(e,docs){
        res.render('artist', { title: 'Artists',artists:docs});
    });*/
});

module.exports = router;