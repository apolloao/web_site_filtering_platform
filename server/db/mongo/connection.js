const config = require('./config');
const mongoose  = require('mongoose');
const HostSchema = require('./schema/host');
const UserSchema = require('./schema/user');

module.exports =()=>{

    mongoose.connect(config.db);

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.db)
    });

    mongoose.connection.on('error', err => {
        console.error(err)
    });

    mongoose.connection.once('open', async () => {
        console.log('Connected to MongoDB', config.db)
        mongoose.model('Host', HostSchema);
        mongoose.model('User', UserSchema);
    })
}