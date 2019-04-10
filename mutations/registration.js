const graphql = require('graphql');
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const auth = require('../types/types').auth
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../util').sendEmailFunction

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
    async resolve(parent, args) {
        
        let encryptedPassword = bcrypt.hashSync(args.password, 10);

        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!(email.test(args.email))) {
            return { "message": "Email ID is not valid" }
        }
        if (args.password.length < 8) {
            return { "message": "password should be min 8 characters" }
        }
        user = await userModel.find({ 'email': args.email })
        //console.log(user);
        if (!user.length > 0) {

            let user = new userModel({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: encryptedPassword,
                verification:false
            });

            user.save();
            var token =await jwt.sign({"email": args.email},"APP_SECRET");
            var url = "http://localhost:3000/graphql/"+token;
            sendMail(url,args.email);

            return {
                "success": true,
                "message": "registration successful"
            }
        }
        else {
            return {
                "success": false,
                "message": "registration unsuccessful , email already exists"
            }
        }


    }
}


