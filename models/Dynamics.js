/**
 * Created by jie on 15/8/2.
 */
//动态
var mongoose = require('mongoose');

var DynamicSchema = new mongoose.Schema({

    image:[String],
    describe:String,
    date:{type:Date,default:Date.now()}
});

mongoose.model('Dynamic',DynamicSchema);