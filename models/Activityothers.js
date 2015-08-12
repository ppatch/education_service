/**
 * Created by an on 15-8-10.
 */
var mongoose = require('mongoose');

var ActivityotherSchema = new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    title:String,
    describe:String,
    image:[String],
    date:{type:Date,default:Date.now()}
});

mongoose.model('Activityother',ActivityotherSchema);