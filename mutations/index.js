/*
     requiring the necessary files
*/


var register = require('./registration').registration;
var login = require('./login').login;
var forgotPassword = require('./forgotPassword').forgotPassword
var resetPassword = require('./resetPassword').resetPassword
var verifyEmail = require('./verifyEmail').verifyEmail
var createLabel = require('./labels/createLabel').createLabel
var updateLabel = require('./labels/updateLabel').updateLabel
var removeLabel = require('./labels/removeLabel').removeLabel
var createNote = require('./notes/notes').createNote
var updateNote = require('./notes/notes').updateNote
var removeNote = require('./notes/notes').removeNote
var addLabelNote = require('./notes/notes').addLabelNote
var removeLabelNote=require('./notes/notes').removeLabelNote
var oAuth = require('./oauth/oAuth').oAuth
var verify = require('./oauth/verify').verifyToken
var imageUpload = require('./imageUpload').imageUpload


const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
} = graphql;

module.exports =
    new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            register,
            login,
            forgotPassword,
            resetPassword,
            verifyEmail,
            createLabel,
            updateLabel,
            removeLabel,
            createNote,
            updateNote,
            removeNote,
            addLabelNote,
            removeLabelNote,
            oAuth,
            verify,
            imageUpload
           
            
        }
    })


