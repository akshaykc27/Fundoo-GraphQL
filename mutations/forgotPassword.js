const graphql = require('graphql')
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const sendMail = require('../util').sendEmailFunction
const auth = require('../types/types').auth


exports.forgotPassword = {
    type: auth,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

async resolve(parent, args){
    user = await userModel.find({'email':args.email});
    console.log(user)
    if(user.length>0)
    {
        token = jwt.sign({email : args.email},"APP_SECRET")
        url = "http://localhost:4000/graphql/"+token;
        sendMail(url,args.email)
        return{
            "message" : token
        }
    }
    return{
        "message" : "Invalid user"
    }
}
}