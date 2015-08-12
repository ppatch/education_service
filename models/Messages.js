/**
 * Created by jie on 15/8/2.
 */
//留言
var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],

    //标题
    title:String,
    //内容
    content:String,
    //回答
    answer:[{answer:String,date:String}],
    date:String,
    openid:String,
    wx:[{type:mongoose.Schema.Types.ObjectId,ref:'Wx'}]
});

mongoose.model('Message',MessageSchema);