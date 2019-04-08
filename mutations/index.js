var register=require('./registration').registration;
var login = require('./login').login;
var forgotPassword = require('./forgotPassword').forgotPassword
var resetPassword = require('./resetPassword').resetPassword

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
}