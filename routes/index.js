var express = require('express');
var router = express.Router();

var querystring = require('querystring');
var url = require('url');
var https = require('https');

var appId = 'wx70197a7eab60c7eb';
var appSecret = '8d942971af7480fe8d3759184c11b550 ';

var mongoose = require('mongoose');
require('../models/Users');
require('../models/Activitys');
require('../models/Addactivitys');
require('../models/Contents');
require('../models/Dynamics');
require('../models/Messages');
require('../models/Addmessages');
require('../models/Rewardeds');
require('../models/Addrewardeds');
require('../models/Signs');
require('../models/Answers')
mongoose.connect('mongodb://huyugui.f3322.org/eduaction_service');

var User = mongoose.model('User');
var Activity = mongoose.model('Activity');
var Addactivity = mongoose.model('Addactivity');
var Content = mongoose.model('Content');
var Dynamic = mongoose.model('Dynamic');
var Message = mongoose.model('Message');
var Addmessage = mongoose.model('Addmessage');
var Rewarded = mongoose.model('Rewarded');
var Addrewarded = mongoose.model('Addrewarded');
var Sign = mongoose.model('Sign');
var Answer = mongoose.model('Answer');


var one = new User({username:'214',password:'123',name:'陈伟鑫',age:'19',sex:'男',mobile:'13726223011'});
var two = new Activity({user:one,title:'Flash交流会',image:'http://pic.nipic.com/2007-11-09/2007119122519868_2.jpg',describe:'促进了老师和学生之间的交流，增进了感情'});
var three = new Addactivity({name:'活动详情',activity:two});
var four = new Rewarded({user:one,title:'蓝桥杯编程比赛',image:'2.jpg',describe:'13游戏软件一班的揭钰峰同学获得蓝桥杯编程比赛第一名'});
var five = new Addrewarded({name:'添加获奖',rewarded:four});
var six = new Answer({answer:''});
var seven = new Message({user:one,category:'关于学习',title:'九九乘法表的背诵方法',content:'老师你好，九九乘法表怎样背诵容易记住老师你好，九九乘法表怎样背诵容易记老师你好，九九乘法表怎样背诵容易记'});
var eight = new Message({user:one,category:'关于课程',title:'课程的安排是什么样的',content:'我想了解一下课程的安排是什么样的'});
var  nine= new Message({user:one,category:'关于报名',title:'我想报学拉丁舞',content:'最近学拉丁舞的课程有哪个时间段的？'});
var  ten= new Message({user:one,category:'其他',title:'你们机构位置在哪里？',content:'我想明天中午过来你们哪里实地了解一下'});
//var eight = new Addmessage({name:'留言',message:six});

//one.save();
//two.save();
//three.save();
////pt.save();
////tt.save();
//four.save();
//five.save();
//six.save();
//seven.save();
//eight.save();
//nine.save();
//ten.save();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录
router.get('/login',function(req,res,next){
  User.findOne({userName:req.query.userName, password:req.query.password},function(err,doc){
    if(err!=null){next(err) }
    else{
      res.json(doc);
    }
  })
});

//活动
router.get('/activity',function(req,res,next){
    Addactivity
        .findOne({_id:'55c1b76edfc037350883f113'})
        .populate('activity')
        //.populate('activity.content')
        //.populate('activity.content')
        .exec(function(err,doc){
            if(err!=null){next(err)}
            else{
                res.json(doc);

            }
        })
})

//添加活动
router.post('/addactivity',function(req,res,next){
    //console.log(req.body);
    var post = new Activity(req.body);
    post.save(function(err,Show){
        Addactivity.findOne({_id:'55c1b76edfc037350883f113'},function(err,doc){
            doc.activity.push(Show._id);
            doc.save(function(err){
            })
        })
        if(err){return next(err)}
        res.json(Show);
    })
})

//删除活动
router.delete('/deleteactivity',function(req,res,next){
    Activity.remove({_id:req.query._id},function(err,doc){
        console.log(req.body._id);
        if(err){return next(err)}
        res.json(doc);

    })
})

//展示获奖
router.get('/rewarded',function(req,res,next){
    Addrewarded
        .findOne({_id:'55c1d69b292f07800af6f75e'})
        .populate('rewarded')
        .exec(function(err,doc){
            if(err!=null){next(err)}
            else{
                res.json(doc);
            }
        })
})

//删除获奖
router.delete('/deleterewarded',function(req,res,next){
    Rewarded.remove({_id:req.query._id},function(err,doc){
        console.log(req.body._id);
        if(err){return next(err)}
        res.json(doc);

    })
})

//添加获奖
router.post('/addrewardeds',function(req,res,next){
    var post = new Rewarded(req.body);
    post.save(function(err,Show){
        Addrewarded.findOne({_id:'55c1d69b292f07800af6f75e'},function(err,doc){
            doc.rewarded.push(Show._id);
            doc.save(function(err){
            })
        })
        if(err){return next(err)}
        res.json(Show);
    })
})

//查看留言
router.get('/message',function(req,res,next){
    Message
        .find(req.query)
        .exec(function(err,doc){

            if(err!=null){next(err)}
            else{
                console.log(doc)
                res.json(doc)
            }

        })
})

router.get('/message/:_id', function (req, res) {
    var _id = req.params._id;

    Message.findOne({_id: _id}).exec(function (err, docs) {
        res.json(docs);
    });
});
//添加留言
router.post('/message', function (req, res, next) {
    //console.log(req.body.text);
    var post = new Message(req.body);
    post.save(function(err,doc){

        if(err!=null){next(err)}
        else{
            res.json(doc)
        }
    })
})
//获取微信头像
router.get('/weixin', function (request, response) {
    var code;
    //解析参数 获取code
    var getData = url.parse(request.url, true).query;
    //获取 code
    if (getData != null) {
        code = getData['code'];
        console.log('--wx : code' + code);
    }
    //获取到code 交换凭证
    if (code != undefined && code != null) {
        //构造URL
        var getAccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='
            + appId + '&secret=' + appSecret + '&code=' + code + '&grant_type=authorization_code';

        //请求交换凭证
        https.get(getAccessTokenUrl, function (res) {
            //获取凭证
            res.on('data', function (data) {
                //凭证 json
                var getAccessTokenResult = JSON.parse(data);
                var accessToken = getAccessTokenResult['access_token'];
                var openid = getAccessTokenResult['openid'];
                console.log('--wx : openid ' + openid);
                console.log(typeof(openid));

                //用凭证获取用户资料
                var getInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openid;

                //获取用户数据
                https.get(getInfoUrl, function (res) {
                    //解析数据
                    res.on('data', function (d2) {
                        var result = JSON.parse(d2);
                        //获取用户信息
                        var _name = result['nickname'];
                        var _headimgurl = result['headimgurl'];
                        // response.writeHead(200, { "Content-Type": "text/html" });
                        console.log('--wx : name' + _name);
                        console.log('--wx : img' + _headimgurl);

                        // Message.find({openid:openid}).populate('user').exec(function (error, result) {
                        //     if (error) next(error)
                        response.writeHead(302, {
                            "Location": "http://huyugui.f3322.org:8102/#/newmessage" + querystring.stringify({
                                Openid: openid,
                                name: _name,
                                headimgurl: _headimgurl,
                                message: result
                            })
                        });
                        response.end();
                        // });
                    });
                });
            });
        }).on('error', function (e) {
            //do something
            next(e);
        });
    } else {
        response.writeHead(302, {"Location": "http://huyugui.f3322.org:8102/#/newmessage?params=xx"});
        response.end();
    }
})
//回复留言
router.post('/message/:_id/answer', function (req, res, next) {
    console.log(req.body.answer);
    console.log(req.body.date);
    console.log(req.body);
    var _id = req.params._id,
        answer = req.body;

    Message.update({_id: _id}, {$push: {answer: answer}}).exec(function (err, docs) {
        res.json({status: 'done'});
    })

})


module.exports = router;
