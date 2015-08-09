/**
 * Created by jie on 15/8/6.
 */
var mongoose = require('mongoose');

var AddmessageSchema = new mongoose.Schema({
    name:String,
    message:[{type:mongoose.Schema.Types.ObjectId,ref:'Message'}]
})

mongoose.model('Addmessage',AddmessageSchema);