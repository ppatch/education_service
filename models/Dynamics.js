var mongoose = require('mongoose');

var DynamicSchema = new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    title:String,
    image:[String],
    file:{
        fieldname: String,
        originalname: String,
        name: String,
        encoding: String,
        mimetype: String,
        path: String,
        extension: String,
        size: String,
        truncated: String,
        buffer: String
    },
    content:String,
    date:{type:Date,default:Date.now()}
});

mongoose.model('Dynamic',DynamicSchema);