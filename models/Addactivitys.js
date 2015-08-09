/**
 * Created by jie on 15/8/3.
 */
var mongoose = require('mongoose');

var AddactivityScheam = new mongoose.Schema({
    name:String,
    activity:[{type:mongoose.Schema.Types.ObjectId,ref:'Activity'}]
})

mongoose.model('Addactivity',AddactivityScheam);