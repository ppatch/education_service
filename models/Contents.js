/**
 * Created by jie on 15/8/2.
 */
var mongoose = require('mongoose');

var ContentSchema = new mongoose.Schema({
    image:String,
    describe:String
});

mongoose.model('Content',ContentSchema);