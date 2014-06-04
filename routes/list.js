var express = require('express');
var router = express.Router();
var model = require('../models/model.js');

var db = require('./db.js');

/* GET home page. */
router.get('/:id', function(req, res) {
    
    /*var para = new Object();
    console.log(req.param('id'));
    para.category = parseInt(req.param('id'));
    var art = db.get('art');
    art.find(para,function(e,docs){
        res.render('list-detail', {arts:docs});
    });*/

    /*model.Art.find({category:req.param('id')},null,function(err,arts){
        res.render('list-detail', {arts:arts});
    });*/
    
    model.Art.findByCategoryId(req.param('id'),null,function(err,arts){
        
        model.Art.joinArtist(arts,function(err,fullArts){
            
            if(err)
                res.send(err);
            else
                res.render('list-detail', {arts:fullArts});
            
        });
        
        
    });
});

router.get('/', function(req, res) {
    model.Category.find({},null,function(err,categories){
        res.render('list', { title: 'Category',cates:categories});
    });
});

router.get('/artist/:id', function(req, res) {
    var id = req.param('id');
    model.Art.find({artist:id},null,function(err,arts){
        res.render('list-detail', {arts:arts});
    });
});

module.exports = router;