// requiring the necessary files

const auth = require('../types/types').auth;
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

//mutation for email verification

exports.verifyEmail = {
    type: auth,

    async resolve(parent, args, context) {


        var payload = await jwt.verify(context.token, "APP_SECRET"); //token verification
        if (!payload) {
            return {
                "message": "verification unsuccessful"
            }
        }
        userUpdate = await userModel.updateOne({ "email": payload.email }, { $set: { "verification": true } })  // finding the user for the email provided and updating the verification field in the database  
        if (userUpdate) {
            return {
                "message": "verification successful"
            }
        }
        else {
            return {
                "message": "verification unsuccessful"
            }

        }
    }
}
