//requiring the necessary files

const graphql = require('graphql');
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const auth = require('../types/types').auth;
const userModel = require('../model/userModel');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

 
//mutation for login 

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


    async resolve(parent,args){

        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //regEX for validating email
        if (!(email.test(args.email))) {
            return { "message": "Email ID is not valid" }
        }
        if(args.password.length<8)    // // validating the password
        {
            return {"message" : "Password should contain minimum 8 characters"} 
        }
        
        user =  await userModel.find({'email' : args.email})  // checking if the email already exists in the database 
        if(user.length>0)
        {
            console.log(user[0].verification);           //email id verification(can not login unless the email is verified)
            if(user[0].verification === false)       
            {
                return {
                    "message" : "Email not verified"
                }
            }
            let valid = bcrypt.compare(args.password, user.password); //encrypting the password
            if(valid)
            {
                let token = await jwt.sign({'email': args.email},'secret',{ expiresIn : '1d'}) //token generation
                console.log(token)
                return {
                    "message" : "login successfull",
                    "success" : true
                }
            }
            else
            {
                return {
                    "message" : "Incorrect password, Try Again!",
                    "success" : false
                }
            }
        }
        else
        {
            return {
                "message" : "Email ID is not registered",
                "success" : false
            }
        }
        
        
    }
}