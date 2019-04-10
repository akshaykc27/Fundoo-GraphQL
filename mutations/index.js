var register=require('./registration').registration;
var login = require('./login').login;
var forgotPassword = require('./forgotPassword').forgotPassword
var resetPassword = require('./resetPassword').resetPassword
var verifyEmail = require('./verifyEmail').verifyEmail

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail
}