const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    password: String,
    account: String
});
module.exports = UserSchema;
