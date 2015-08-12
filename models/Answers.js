/**
 * Created by jie on 15/8/6.
 */
var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    answer:String,
    date:{type:Date,default:Date.now()}
})

mongoose.model('Answer',AnswerSchema);