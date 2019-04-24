const mongoose = require('mongoose');
var schema = mongoose.Schema;
var labelSchema = new schema({  // defining the mongodb schema

    labelName: {
        type: 'string',
        required: true
    },


    userID: {
        type: schema.Types.ObjectId,
        ref : 'userSchema'
    }
},
    {
        timestamps:true
    });

module.exports = mongoose.model('labels', labelSchema); // exporting the model