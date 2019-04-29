/*
     requiring the necessary files
*/

const graphql = require('graphql');
const auth = require('../types/types').auth
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../util').sendEmailFunction
const redis = require('redis')
var client = redis.createClient()

/*
    declaring the graphQL types
*/

const { GraphQLString,
    GraphQLNonNull } = graphql;

/*
     mutation for registering a user
*/

exports.registration = {
    type: auth,
    args: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString)
        },
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
        try {
            var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //regEX for validating email
            if (!(email.test(args.email))) {
                return { "message": "Email ID is not valid" }
            }
            if (args.password.length < 8) {  // validating the password
                return { "message": "password should be min 8 characters" }
            }
            let encryptedPassword = bcrypt.hashSync(args.password, 10); // encrypting the password
            user = await userModel.find({ 'email': args.email })  //checking the database for existing user with the same email 
            //console.log(user);
            if (!user.length > 0) {
                let user = new userModel({    // creating an object and saving the details of the user in the database
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: encryptedPassword,
                    verification: false
                });
                user.save();
                /*
                generating the token and sending it to the email provided to check the authenticity of the user
                */
                var token = await jwt.sign({ "email": args.email }, "APP_SECRET");
                client.set("registerToken" + args.id, token); // saving the token in redis cache
                client.get("registerToken" + args.id, function (error, result) {
                    if (error) {
                        console.log(error);

                    }
                    console.log('Register token-> ' + result);
                });
                var url = "http://localhost:3000/graphql?token=" + token;
                sendMail(url, args.email);
                return {
                    "success": true,
                    "message": "registration successful",
                    "token": token
                }
            }
            else {
                return {
                    "success": false,
                    "message": "registration unsuccessful , email already exists"
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


