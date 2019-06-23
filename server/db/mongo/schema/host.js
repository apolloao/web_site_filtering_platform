const mongoose = require('mongoose');
const { Schema } = mongoose;
const HostSchema = new Schema({
    host: String,
    ip: String,
    type:String,
    name:String,
    user:String,
    label:String,
    type1: String,
    type2: String,
    createTime: String,
    status:Number
});
module.exports = HostSchema;
