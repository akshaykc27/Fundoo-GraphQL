var auth = require('../types/types').auth;
const { GraphQLString } = require('graphql')
userModel = require('../model/userModel');
jwt = require('jsonwebtoken');
exports.imageUpload = ({
    type: auth,
    async resolve(parent, args, context) {
        if (context.token) {
            payload = await jwt.verify(context.token, 'secret')
            console.log("Image url => ", context.request.file.location);
            updateUrl = await userModel.findOneAndUpdate({ _id: payload.userID }, { $set: { imageUrl: context.request.file.location } })
            if (updateUrl) {
                return {
                    "message": "image uploaded successfully",
                }
            }
        }
        else {
            return {
                profileUrl: "token not provided",

            }
        }
    }
})
