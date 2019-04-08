const graphql = require('graphql');
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const auth = require('../types/types').auth;
const userModel = require('../model/userModel');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');



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

        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!(email.test(args.email))) {
            return { "message": "Email ID is not valid" }
        }
        if(args.password.length<8)
        {
            return {"message" : "Password should contain minimum 8 characters"}
        }

        user =  await userModel.find({'email' : args.email})
        if(user.length>0)
        {
            let valid = bcrypt.compare(args.password, user.password);
            if(valid)
            {
                let token = await jwt.sign({'email': args.email},'secret',{ expiresIn : '1d'})
                console.log(token)
                return {
                    "message" : token,
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