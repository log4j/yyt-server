var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdb');

var Schema = mongoose.Schema;
//var ObjectId = mongoose.Types.ObjectId;

function init(){
    var model = this;
    
    
    
    /**
     * artist
     */ 
    var artistSchema = new Schema({
        name:   String,
        birthday:   String,
        sex:    String,
        location:   String,
        avatar: String,
        motto: String,
        profile: String
    });
    artistSchema.methods.findArts = function(callback){
        model.Art.find({artist:this._id},callback);
    };
    artistSchema.statics.findByName = function(name, callback){
        this.find({name:name}, callback);  
    };
    
    /**
     * category
     */ 
    var categorySchema = new Schema({
        name:   String,
        profile:    String,
        updatetime: {type: Date, default: Date.now}
    });
    
    
    
    /**
     * art
     */ 
    var artSchema = new Schema({
        artist: Schema.ObjectId,
        name:   String,
        image:  String,
        category:   Schema.ObjectId,
        updatetime: {type: Date, default: Date.now}
    });
    artSchema.statics.findByArtistId = function (_id, callback){
        this.find({artist:_id}, callback);
    };
    artSchema.statics.findByCategoryId = function (_id, opt, callback){
        this.find({category:_id}, opt, callback);
        
        /*this.$where(function(){return this.category == _id;}).exec(function(err,docs){
            console.log(err);
            console.log(docs);
        });*/
    };
    artSchema.statics.joinArtist = function (arts, callback){
        //artist id
        var ids = arts.map(function (m) {
            return m.artist;
        });
        model.Artist.find({_id:{$in:ids}},null,function(err,artists){
            if(err){
                console.log(err);
                callback(err,arts);
            }
            else{
                console.log('ids:'+ids);
                
                var map = [];
                for(var i=0;i<artists.length;i++){
                    map[artists[i]._id] = artists[i];
                    //console.log(artists[i]._id + "-> map");
                }
                var results = [];
                for(var i=0;i<arts.length;i++){
                    var artist = map[arts[i].artist];
                    var obj = arts[i].toObject();
                    obj.artistName = artist.name;
                    results.push(obj);
                }
                callback(err,results);
            }
        });
        
        //this.$where
    };
    
    
    this.Artist = mongoose.model('Artist',artistSchema);
    this.Art = mongoose.model('Art',artSchema);
    this.Category = mongoose.model('Category',categorySchema);
    
    //this.Artist
    
    return this;
};

module.exports = init();