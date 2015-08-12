/**
 * Created by jie on 15/8/2.
 */
//课程优惠活动
var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    title:String,
    kecheng:String,
    teacher:String,
    price:String,
    time:String,
    date:{type:Date,default:Date.now()}
});

mongoose.model('Activity',ActivitySchema);