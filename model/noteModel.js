const mongoose = require('mongoose');
var schema = mongoose.Schema;
var noteSchema = new schema({  // defining the mongodb schema

    labelID: [{
        type: schema.Types.ObjectId,
        ref : 'labelSchema'
    }],
    
    userID: {
        type: 'string',
        required : true
        
    },
    
    title: {
        type: 'string',
        required: true
    },

    description: {
        type: 'string',
        required: true
    },

},
    {
        timestamps:true
    });

module.exports = mongoose.model('notes', noteSchema); // exporting the model