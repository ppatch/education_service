var express = require('express');
var router = express.Router();

var querystring = require('querystring');
var url = require('url');
var https = require('https');

var appId='wx70197a7eab60c7eb';
var appSecret='8d942971af7480fe8d3759184c11b550';

var mongoose = require('mongoose');
require('../models/Users');
require('../models/Activitys');
require('../models/Activityothers');
require('../models/Contents');
require('../models/Dynamics');
require('../models/Messages');
require('../models/Rewardeds');
require('../models/Orders');
require('../models/Answers');
require('../models/Wxs');

//mongoose.connect('mongodb://10.211.55.3/eduaction1');
mongoose.connect('mongodb://huyugui.f3322.org/eduaction_service1');

var User = mongoose.model('User');
var Activity = mongoose.model('Activity');
var Content = mongoose.model('Content');
var Dynamic = mongoose.model('Dynamic');
var Message = mongoose.model('Message');
var Rewarded = mongoose.model('Rewarded');
var Activityother = mongoose.model('Activityother');
var Order = mongoose.model('Order');
var Answer = mongoose.model('Answer');
var Wx=mongoose.model('Wx');


var one = new User({username: '214', password: '123', name: '陈伟鑫', age: '19', sex: '男', mobile: '13726223011'});
var six = new Activity({user: one, title: '课程优惠', kecheng: '数学', teacher: '成老师', time: '8:30~11:30', price: '456元'});
var six2 = new Activityother({
    title: '课程优惠',
    image: 'https://www.baidu.com/link?url=xQtV7CCYdRgdopZPXYow0rdyKFbP4iUOmhlUvgPxU-PpSdI0spodK0rdviJG6NYI&wd=&eqid=9fdae7710006b6140000000455c80c49',
    describe: "Flash交流会，进行Flash技术的研发探讨"
});
//var three = new Addactivity({name: '活动详情', activity: [six, six2]});
var four = new Rewarded({user: one, title: '蓝桥杯编程比赛', image: '2.jpg', describe: '13游戏软件一班的揭钰峰同学获得蓝桥杯编程比赛第一名'});
//var five = new Addrewarded({name: '添加获奖', rewarded: four});
var m1 = new Message({user: one, category: '关于学生', title: '学生怎么样提高学习效率', content: '少读书，多睡觉，多吃零食多看报'});
//m1.save();
var o1 = new Order({
    user: one,
    title: '课程优惠',
    keci: '8',
    phone: '10086',
    class: '数学',
    time: '08/19~08/28 每天8:30-11:30',
    price: '998'
});
var seven = new Order({user: one, name: '姚凯鹏', phone: '12345678910', kecheng: '英语', apply: '等待审核'});
var eight = new Order({user: one, name: '林晓创', phone: '1357924680', kecheng: '游泳', apply: '等待审核'});
var nine = new Order({user: one, name: '歐炳傑', phone: '1597384620', kecheng: '钢琴', apply: '等待审核'});
var ten = new Order({user: one, name: '揭钰峰', phone: '13455589105', kecheng: '吉他', apply: '等待审核'});
var eleven = new Answer({answer: ''});
var twelve = new Message({
    user: one,
    category: '关于学习',
    title: '九九乘法表的背诵方法',
    content: '老师你好，九九乘法表怎样背诵容易记住老师你好，九九乘法表怎样背诵容易记老师你好，九九乘法表怎样背诵容易记'
});
var thirteen = new Message({user: one, category: '关于课程', title: '课程的安排是什么样的', content: '我想了解一下课程的安排是什么样的'});
var fourteen = new Message({user: one, category: '关于报名', title: '我想报学拉丁舞', content: '最近学拉丁舞的课程有哪个时间段的？'});
var fifteen = new Message({user: one, category: '其他', title: '你们机构位置在哪里？', content: '我想明天中午过来你们哪里实地了解一下'});
var sixteen = new Message({
    user: one,
    title: '九九乘法表的背诵方法',
    content: '老师你好，九九乘法表怎样背诵容易记住老师你好，九九乘法表怎样背诵容易记老师你好，九九乘法表怎样背诵容易记',
    date: '15:13'
});


//o1.save();
//six.save();
//six2.save();

//one.save();
//two.save();
//three.save();
////pt.save();
////tt.save();
//four.save();
//five.save();
//seven.save();
//eight.save();
//nine.save();
//ten.save();
//eleven.save();
//twelve.save();
//thirteen.save();
//fourteen.save();
//fifteen.save();
//sixteen.save()
/* GET home page. */


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

//获取微信头像
router.get('/weixin', function (request, response,next) {
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

        console.log('getAccessTokenUrl' + getAccessTokenUrl);

        //请求交换凭证
        https.get(getAccessTokenUrl, function (res) {
            //获取凭证
            res.on('data', function (data) {
                //凭证 json
                var getAccessTokenResult = JSON.parse(data);
                var accessToken = getAccessTokenResult['access_token'];
                var openid = getAccessTokenResult['openid'];
                console.log('--wx : code' + code);
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
                        console.log('--wx : openid ' + openid);
                        console.log('--wx : name' + _name);
                        console.log('--wx : img' + _headimgurl);

                        response.writeHead(302, { "Location": "http://huyugui.f3322.org:8103/#/home?"+ querystring.stringify({Openid: openid,name: _name,headimgurl: _headimgurl,message: result}) });
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
        response.writeHead(302, {"Location": "http://huyugui.f3322.org:8103/#/home?params=xx"});
        response.end();
    }
})

//登录
router.get('/login', function (req, res, next) {
    User.findOne({userName: req.query.userName, password: req.query.password}, function (err, doc) {
        if (err != null) {
            next(err)
        }
        else {
            res.json(doc);
        }
    })
});
////活动
router.get('/activity', function (req, res, next) {
    Activity.find(req.query).populate('user').exec(function (error, result) {
        if (error) next(error);
        res.json(result);
    })
});
//获取其他活动
router.get('/activityother', function (req, res, next) {
    Activityother.find(req.query).populate('user').exec(function (error, result) {
        if (error) next(error);
        res.json(result);
    })
});
//添加活动
router.post('/addactivity', function (req, res, next) {
    Activity.create(req.body, function (error, result) {
        if (error) next(error);
        res.json(result);
    })
})
//获取其他活动
router.post('/addactivityother', function (req, res, next) {
    Activityother.create(req.body, function (error, result) {
        if (error) next(error);
        res.json(result);
    })
})
//删除活动
router.delete('/deleteactivity', function (req, res, next) {
    Activity.remove({_id: req.query._id}, function (err, doc) {
        console.log(req.body._id);
        if (err) {
            return next(err)
        }
        res.json(doc);

    })
})
//删除其他活动
router.delete('/deleteactivityother', function (req, res, next) {
    Activityother.remove({_id: req.query._id}, function (err, doc) {
        console.log(req.body._id);
        if (err) {
            return next(err)
        }
        res.json(doc);

    })
})

//展示获奖
router.get('/rewarded', function (req, res, next) {
    Rewarded.find(req.query).populate('user')
        .exec(function (err, doc) {
            if (err != null) {
                next(err)
            }
            else {
                res.json(doc);
            }
        })
})

//删除获奖
router.delete('/deleterewarded', function (req, res, next) {
    Rewarded.remove({_id: req.query._id}, function (error, result) {
        console.log(req.body._id);
        if (error) next(error);
        res.json(result);
    })
})

//添加获奖
router.post('/addrewardeds', function (req, res, next) {
    Rewarded.create(req.body, function (error, result) {
        if (error) next(error);
        res.json(result);
    })
});

//存储留言
router.post('/liuyan', function (req, res, next) {
    console.log(req.body);
    Message.create(req.body, function (error, result) {
        if (error) next(error);
        res.json(result);
    })
});
//读取留言
router.get('/message', function (req, res, next) {
    console.log(req.query.openid)
    Message.find(req.query.openid)
        .sort({date: -1}).exec(function (error, result) {
            if(error!=null){next(error)}
            else {
                res.json(result);
            }
    })

});
router.get('/message/:_id', function (req, res) {
    var _id = req.params._id;
    Message.findOne({_id: _id}).exec(function (err, docs) {
        res.json(docs);
    });
});
//回复留言
router.post('/message/:_id/answer', function (req, res, next) {

    var _id = req.params._id,
        answer = req.body;
    Message.update({_id: _id}, {$push: {answer: answer}}).exec(function (err, docs) {
        res.json({status: 'done'});
    })
});
//预约报名
router.post('/order', function (req, res, next) {
    console.log(req.body);
    var order = new Order(req.body);
    order.save(function (error, order) {
        if (error) next(error);
        res.json(order);
    });
    //
});

//上传文件
router.post('/upfile', function (req, res, next) {
    console.log(req.files.file);
    Dynamic.create(req.body, function (error, result) {
        if (error) next(error);
        res.json(result);
    })
});


//报名-查看报名
router.get('/sign', function (req, res, next) {
    Order
        .find(req.query)
        .exec(function (err, doc) {
            if (err != null) {
                next(err)
            }
            else {
                //console.log(doc)
                res.json(doc)
            }
        })
});

//报名-审核报名-确定报名
router.get('/sign_apply_ok', function (req, res, next) {
    console.log(req.query.apply);
    Order.findOneAndUpdate({apply: '等待审核'}, {apply: req.query.apply}, function (err, doc) {
        console.log('确定');
        if (err) {
            return next(err)
        }
        else {
            res.json(doc)
        }
    })
});

//报名-审核报名-取消报名
router.get('/sign_apply_no', function (req, res, next) {
    console.log(req.query);
    Order.findOneAndUpdate({apply: '等待审核'}, {apply: req.query.apply}, function (err, doc) {
        console.log('取消');
        if (err) {
            return next(err)
        }
        res.json(doc);
    })
});

//动态-添加动态-视频
router.post('/adddynamic_video',function(req,res,next){
    console.log(req.files.file);
    Dynamic.create(req.files,function(error,doc){
        if(error){next(error)}
        res.json(doc);
    })
})

//动态-添加动态-内容
router.post('/adddynamic',function(req,res,next){
    console.log(req.body);
    Dynamic.update({_id:req.body._id},{$push:{title:req.body.title,content:req.body.content,image:req.body.image}})
        .exec(function(err,doc){
            res.json(doc)
        })
})

//动态-查看动态
router.get('/dynamic',function(req,res,next){
    Dynamic
        .find(req.query._id)
        .exec(function(err,doc){
            if(err!=null){next(err)}
            else{
                res.json(doc);
            }
        })
})
//删除动态
router.delete('/delectdynamic', function (req, res, next) {
    Dynamic.remove({_id: req.query._id}, function (error, result) {
        console.log(req.body._id);
        if (error) next(error);
        res.json(result);
    })
})
////储存微信个人资料
//router.post('/weixin', function (req, res, next) {
//    console.log(req.body);
//    Wx.create(req.body, function (error, result) {
//
//        if (error) next(error);
//        res.json(result);
//    })
//})
////获得微信个人资料
//router.get('/message', function (req, res, next) {
//    Message.find(req.query).populate('Wx').sort({date: -1}).exec(function (error, result) {
//        if (error) next(error);
//        res.json(result);
//    })
//});
module.exports = router;
