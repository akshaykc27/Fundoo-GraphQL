const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({

    firstName: {
        type: 'string',
        required: true
    },

    lastName: {
        type: 'string',
        required: true
    },

    email: {
        type: 'string',
        required: true
    },

    password: {
        type: 'string',
        required: true
    },

    verification : {
        type : 'boolean',
        timestamps : true
    }
});

module.exports = mongoose.model('user', userSchema);