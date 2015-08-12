/**
 * Created by an on 15-7-29.
 */
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        name : String,
        phone : String,
        kecheng:String,
        apply:String,
        lesson:[{type:mongoose.Schema.Types.ObjectId ,ref:'Lesson'}] ,//通过预约的课程读到课程的所有信息。
        date: {type: Date, default: Date.now()}
    });
mongoose.model('Order', OrderSchema);