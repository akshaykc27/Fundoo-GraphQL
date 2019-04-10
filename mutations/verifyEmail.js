const auth = require('../types/types').auth;
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');



exports.verifyEmail = {
    type: auth,

    async resolve(parent, args, context) {


        var payload = await jwt.verify(context.token, "APP_SECRET");
        if (!payload) {
            return {
                "message": "verification unsuccessful"
            }
        }
        userUpdate = await userModel.updateOne({ "email": payload.email }, { $set: { "verification": true } })
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
