const graphql = require('graphql')
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;


// requiring the necessary files
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const sendMail = require('../util').sendEmailFunction
const auth = require('../types/types').auth

//mutation for forgot password
exports.forgotPassword = {
    type: auth,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

async resolve(parent, args){
    user = await userModel.find({'email':args.email});  //checking if the email already exists in the database 
    console.log(user)
    if(user)
    {
        token = jwt.sign({email : args.email},"APP_SECRET")   //generates the token and sends to the email provided for the further process 
        url = "http://localhost:3000/graphql?token="+token;
        sendMail(url,args.email)
        return{
            "message" : "A link to reset your password has been sent to your email",
            "token": token 
        }
    }
    return{
        "message" : "Invalid user"
    }
}
}