const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({  // defining the mongodb schema

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    verification: {
        type: String
    },
    gitVerify: {
        type: Boolean,
        default: false
    },
    gitID: {
        type: String,
        default: ""
    },
    gitUsername: {
        type: String,
        default: ""
    },
    gitToken: {
        type: String
    },
    imageUrl: {
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('user', userSchema); // exporting the model