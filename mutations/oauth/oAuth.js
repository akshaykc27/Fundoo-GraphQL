// Import the axios library, to make HTTP request
const axios = require('axios')
const auth = require('../../types/types').auth
const clientID = process.env.clientID
const clientSecret = process.env.clientSecret
const userModel = require('../../model/userModel')
const jwt = require('jsonwebtoken')
var send = require('../oauth/verify')

exports.oAuth = {

    type: auth,

    resolve(parent, args, context) {
        // Import the axios library, to make HTTP requests 
        axios({
            // make a POST request
            method: 'post',
            // to the Github authentication API, with the client ID, client secret
            // and request token
            url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${context.code}`,
            // Set the content type header, so that we get the response in JSOn
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            // Once we get the response, extract the access token from
            // the response body
            const accessToken = response.data.access_token
            // redirect the user to the welcome page, along with the access token
            console.log(accessToken)
            getToken(accessToken);
        })

        function getToken(accessToken) {
            axios({
                // make a POST request
                method: 'get',
                // to the Github authentication API, with the client ID, client secret
                // and request token
                url: `https://api.github.com/user?access_token=${accessToken}`,
                // Set the content type header, so that we get the response in JSOn
                headers: {
                    accept: 'application/json'
                }
            }).then(async (response) => {
                // Once we get the response, extract the access token from
                // the response body

                // redirect the user to the welcome page, along with the access token
                console.log(response.data)
                var token = jwt.sign({gitUsername: response.data.login, gitID: response.data.id},'gitsecret')
                //    console.log("token",token);
                
                gitUser = new userModel({
                    gitUsername: response.data.login, gitID: response.data.id 
                })

                let user = await gitUser.save();
                if (!user) {
                    return {
                        "message": "error while saving the user"
                    }
                }
                return {"message":"succesfully"}
                // else {

                  
                //     if(!a)
                //     {
                        
                //     }             
                //     return {
                        
                //         "message": "saved the user successfully"
                //     }
                // }

                




            })

        }

    }



}