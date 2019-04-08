const graphql = require('graphql')
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../types/types').auth

exports.resetPassword = {
    type: auth,
    args: {
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        confirmPassword: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(parent, args, context) {

        if (args.password != args.confirmPassword) {
            return {
                "message": "passwords dont match"
            }
        }
        else {
            var payload = await jwt.verify(context.token, "APP_SECRET");
            userUpdate = await userModel.updateOne({ "email": payload.email }, { $set: { "password": args.password } })
            if (userUpdate) {
                return {
                    "message": "password reset successful"
                }
            }
            else {
                return {
                    "message": "password reset unsuccessful"
                }
            }

        }
    }
}