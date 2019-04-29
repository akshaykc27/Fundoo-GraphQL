/*
     requiring the necessary files
*/

const graphql = require('graphql');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const sendMail = require('../util').sendEmailFunction
const auth = require('../types/types').auth

/* 
    declaring the graphQL types
*/

const { GraphQLString,
    GraphQLNonNull } = graphql;

/*
    mutation for forgot password
*/

exports.forgotPassword = {
    type: auth,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     */
    async resolve(parent, args) {
        try {
            user = await userModel.find({ 'email': args.email });  //checking if the email already exists in the database 
            console.log(user)
            if (user) {
                token = jwt.sign({ email: args.email }, "APP_SECRET")   //generates the token and sends to the email provided for the further process 
                url = "http://localhost:3000/graphql?token=" + token;
                sendMail(url, args.email)
                return {
                    "message": "A link to reset your password has been sent to your email",
                    "token": token
                }
            }
            return {
                "message": "Invalid user"
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