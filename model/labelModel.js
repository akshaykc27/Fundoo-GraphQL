const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({  // defining the mongodb schema

    labelName: {
        type: 'string',
        required: true
    },


    userID: {
        type: 'string',
        required: true
    }
},
    {
        timestamps:true
    });

module.exports = mongoose.model('labels', userSchema); // exporting the model