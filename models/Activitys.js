/**
 * Created by jie on 15/8/2.
 */
//活动
var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    title:String,
    image:[String],
    describe:String,
    //content:[{type:mongoose.Schema.Types.ObjectId,ref:'Content'}],
    date:{type:Date,default:Date.now()}
});

mongoose.model('Activity',ActivitySchema);