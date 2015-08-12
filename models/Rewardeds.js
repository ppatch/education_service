/**
 * Created by jie on 15/8/2.
 */
//获奖
var mongoose = require('mongoose');

var RewardedSchema = new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    title:String,
    image:[String],
    describe:String,
    time:String,
    people:String,
    date:{type:Date,default:Date.now()}
})

mongoose.model('Rewarded',RewardedSchema);