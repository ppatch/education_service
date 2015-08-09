/**
 * Created by jie on 15/8/2.
 */
//报名
var mongoose = require('mongoose');

var SignScheam = new mongoose.Schema({
    //title:String,
    //template:String
    name:String,
    reward:[{type:mongoose.Schema.Types.ObjectId,ref:'Rewarded'}]
})

mongoose.model('Sign',SignScheam);