const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({  // defining the mongodb schema

    firstName: {
        type: 'string',
        //required: true
    },

    lastName: {
        type: 'string',
        //required: true
    },

    email: {
        type: 'string',
        //required: true
    },

    password: {
        type: 'string',
        //required: true
    },

    verification : {
        //type : 'boolean',
        
    },
    gitVerify : {
        type:'boolean',
        default:false
    },
    gitID : {
        type:String,
        default:""
    },
    gitUsername : {
        type : String,
        default:""
    },
    gitToken : {
        type : String
    }
},
    {
        timestamps:true
    });

module.exports = mongoose.model('user', userSchema); // exporting the model