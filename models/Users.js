/**
 * Created by jie on 15/8/2.
 */
//用户
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    age:String,
    sex:String,
    mobile:String,
    image :String
});

mongoose.model('User',UserSchema);