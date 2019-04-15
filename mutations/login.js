/*
    requiring the necessary files
*/

const graphql = require('graphql');
const auth = require('../types/types').auth;
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('redis')
var client = redis.createClient()

/* 
    declaring the GraphQL types 
*/

const { GraphQLString,
    GraphQLNonNull } = graphql;

/* 
   mutation for login
*/

exports.login = {
    type: auth,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     */
    async resolve(parent, args) {

        try{

        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //regEX for validating email
        if (!(email.test(args.email))) {
            return { "message": "Email ID is not valid" }
        }
        if (args.password.length < 8)    // // validating the password
        {
            return { "message": "Password should contain minimum 8 characters" }
        }

        user = await userModel.find({ 'email': args.email })  // checking if the email already exists in the database 
        if (user.length > 0) {
            //console.log(user[0].verification);           //email id verification(can not login unless the email is verified)
            if (user[0].verification === false) {
                return {
                    "message": "Email not verified"
                }
            }
            let valid = bcrypt.compare(args.password, user.password); //encrypting the password
            if (valid) {
                let token = await jwt.sign({ 'email': args.email, "userID": user[0].id, "password": user[0].password }, 'secret', { expiresIn: '1d' }) //token generation
                client.set("loginToken", token)
                return {
                    "message": token,
                    "success": true
                }
            }
            else {
                return {
                    "message": "Incorrect password, Try Again!",
                    "success": false
                }
            }
        }
        else {
            return {
                "message": "Email ID is not registered",
                "success": false
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