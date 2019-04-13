var register=require('./registration').registration;
var login = require('./login').login;
var forgotPassword = require('./forgotPassword').forgotPassword
var resetPassword = require('./resetPassword').resetPassword
var verifyEmail = require('./verifyEmail').verifyEmail
var createLabel = require('./labels/createLabel').createLabel
var updateLabel =require('./labels/updateLabel').updateLabel
var removeLabel = require('./labels/removeLabel').removeLabel
module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail,
    createLabel,
    updateLabel,
    removeLabel
    
}