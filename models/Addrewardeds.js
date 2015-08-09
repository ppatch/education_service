/**
 * Created by jie on 15/8/5.
 */
    //添加获奖
var mongoose = require('mongoose');

var AddrewardedSchema = new mongoose.Schema({
    name:String,
    rewarded:[{type:mongoose.Schema.Types.ObjectId,ref:'Rewarded'}]
})

mongoose.model('Addrewarded',AddrewardedSchema);