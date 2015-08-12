/**
 * Created by apple on 15-8-12.
 */
var mongoose = require('mongoose');

var WxSchema = new mongoose.Schema({
    openid:String,
    name:String,
    headurl:String
})

mongoose.model('Wx',WxSchema);