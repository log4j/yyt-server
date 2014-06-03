/**
 * insert test data into mongodb (mdb)
 */ 

var express = require('express');
var router = express.Router();

require('../util/date.format.js');

var db = require('./db.js');

var artistName = [
    '周喜喜',
    '和珊',
    '马欣伟',
    '吕奡然',
    '茅炜鑫',
    '常焙筌',
    '张舒',
    '巢捷',
    '许骏杰',
    '曹娜',
    '马睿',
    '薄靖雯',
    '杨彦祥',
    '严蓓',
    '顾文天',
    '陆志文',
    '王萌祺',
    '苗萌',
    '祁德亚',
    '张杰'
];
var artistBirthday = [
    '1980-01-02',
    '1980-01-03',
    '1980-01-04',
    '1980-01-05',
    '1980-01-06',
    '1980-01-07',
    '1980-01-08',
    '1980-01-09',
    '1980-01-10',
    '1980-01-11',
    '1980-01-12',
    '1980-01-13',
    '1980-01-14',
    '1980-01-15',
    '1980-01-16',
    '1980-01-17',
    '1980-01-18',
    '1980-01-19',
    '1980-01-20',
    '1980-01-21',
    '1980-01-22'
];
var artistLocation = [
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai',
    'Shanghai'
];


var artistMotto = [
    '青少年是一个美好而又是一去不可再得的时期，是将来一切光明和幸福的开端。——加里宁',
    '人的志向通常和他们的能力成正比例。——约翰逊',
    '时间抓起来说是金子，抓不住就是流水。——谚语',
    '夫志当存高远，慕先贤，绝情欲，弃疑滞，使庶几之志，揭然有所存，恻然有所感；忍屈伸，去细碎，广咨问，除嫌吝，虽有淹留，何损于美趣，何患于不济。若志不强毅，意不慷慨，徒碌碌滞于俗，默默束于情，永窜伏于平庸，不免于下流矣。——诸葛亮',
    '夫学须志也，才须学也，非学无以广才，非志无以成学。——诸葛亮',
    '每一个人要有做一代豪杰的雄心斗志！应当做个开创一代的人。——周恩来',
    '三军可夺帅也，匹夫不可夺志也。——孔丘',
    '有志者事竟成也！——刘秀',
    '志不立，天下无可成之事。——王阳明',
    '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。——苏轼',
    '一个人如果不到最高峰，他就没有片刻的安宁，他也就不会感到生命的恬静和光荣。——肖伯纳',
    '燕雀安知鸿鹄之志。——司马迁',
    '战士自有战士的抱负：永远改造，从零出发；一切可耻的衰退，只能使人视若仇敌，踏成泥沙。——郭小川',
    '最糟糕的是人们在生活中经常受到错误志向的阻碍而不自知，真到摆脱了那些阻碍时才能明白过来。——歌德',
    '天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。——《孟子》',
    '人无善志，虽勇必伤。——《淮南子》',
    '坚志者，功名之主也。不惰者，众善之师也。——《抱朴子》',
    '人患志之不立，亦何忧令名不彰邪？——刘义庆',
    '大丈夫处世，当扫除天下，安事一室乎！——《后汉书》',
    '大丈夫当雄飞，安能雌伏？——《后汉书》'
];

var cateName = [
    '文学',
    '建筑',
    '风景'
];
var cateProfile = [
    '文学作品',
    '建筑作品',
    '风景作品'
];


var artIds = [
    '2014050612010001.jpg',	
    '2014050612010006.jpg',	
    '2014050612010011.jpg',
    '2014050612010002.jpg',	
    '2014050612010007.jpg',	
    '2014050612010012.jpg',
    '2014050612010003.jpg',	
    '2014050612010008.jpg',	
    '2014050612010013.jpg',
    '2014050612010004.jpg',	
    '2014050612010009.jpg',	
    '2014050612010014.jpg',
    '2014050612010005.jpg',	
    '2014050612010010.jpg'
];
var artName = [
    '2014050612010001',	
    '2014050612010006',	
    '2014050612010011',
    '2014050612010002',	
    '2014050612010007',	
    '2014050612010012',
    '2014050612010003',	
    '2014050612010008',	
    '2014050612010013',
    '2014050612010004',	
    '2014050612010009',	
    '2014050612010014',
    '2014050612010005',	
    '2014050612010010'
];


/* GET home page. */
router.get('/', function(req, res) {
    var content = "";
    var finished = false;
    var artists = [];
    for (var i=0;i<20;i++){
        var id = i+1;
        var artist = new Object();
        artist.id = id;
        artist.name = artistName[i];
        artist.birthday = artistBirthday[i];
        artist.location = artistLocation[i];
        artist.image = id+'.jpg';
        artist.sex = i%2==0?'男':'女';
        artist.motto = artistMotto[i];
        
        artists.push(artist);
    }
    
    var now = new Date();
    var date = now.format('yyyy-mm-dd');
      
    
    /*var artistDB = db.get('artist');
    artistDB.insert(artists,function(err, doc){
        finished = true;
        content += doc;
    });*/
    
    var cates = [];
    for (var i=0;i<3;i++){
        var id = i+1;
        var cate = new Object();
        cate.id = id;
        cate.name = cateName[i];
        cate.profile = cateProfile[i];
        cate.updatetime = date;
        cates.push(cate);
    }
    
    
    /*var cateDB = db.get('category');
    cateDB.insert(cates,function(err, doc){
        finished = true;
        content += doc;
    });*/
   // res.send('init start...');

    var arts = [];
    for(var i=0;i<artIds.length;i++){
        var id = i+1;
        var art = new Object();
        art.id = id;
        art.artist = parseInt(Math.random()*artistBirthday.length)+1;
        art.name = artName[i];
        art.image = artIds[i];
        art.category = parseInt(Math.random()*3)+1;
        now.setSeconds(i);
        art.updatetime = now.format('yyyy-mm-dd HH:MM:ss');
        
        arts.push(art);
    }
    var artDB = db.get('art');
    artDB.insert(arts,function(err, doc){
        finished = true;
        content += doc;
    });
    
    var pid = setInterval(function(){
        if(finished){
            clearInterval(pid);
            res.send(content);
        }
    },200);
});

module.exports = router;


