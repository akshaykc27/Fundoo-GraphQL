/* 
    requiring the necessary files
*/

const graphql = require('graphql');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../types/types').auth
const bcrypt = require('bcryptjs')

/*
    declaring the graphQL types
*/
const { GraphQLString,
    GraphQLNonNull } = graphql;



/* 
    mutation for reset password
*/

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

    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     */

    async resolve(parent, args, context) {

        try {
            if (args.password != args.confirmPassword) {  // checking whether both the passwords entered match
                return {
                    "message": "passwords don't match"
                }
            }
            else {
                var encryptedPassword = bcrypt.hashSync(args.password, 10)
                var payload = await jwt.verify(context.token, "APP_SECRET");  // token verification
                userUpdate = await userModel.updateOne({ "email": payload.email }, { $set: { "password": encryptedPassword } })  // finding the user for the email provided and updating the password in the database  
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
        catch (err) {
            console.log("ERROR: " + err);
            return {
                "message": err
            }

        }

    }
}