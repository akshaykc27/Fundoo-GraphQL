//requiring the necessary files

const graphql = require('graphql')
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../types/types').auth

// mutation for reset password
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

        if (args.password != args.confirmPassword) {  // checking whether both the passwords entered match
            return {
                "message": "passwords don't match"
            }
        }
        else {
            var payload = await jwt.verify(context.token, "APP_SECRET");  // token verification
            userUpdate = await userModel.updateOne({ "email": payload.email }, { $set: { "password": args.password } })  // finding the user for the email provided and updating the password in the database  
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