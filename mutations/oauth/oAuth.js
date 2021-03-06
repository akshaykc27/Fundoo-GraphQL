// Import the axios library, to make HTTP request
const axios = require('axios')
const auth = require('../../types/types').auth
const userModel = require('../../model/userModel');
const jwt = require('jsonwebtoken');
var util = require('../../util');
const clientID = process.env.clientID
const clientSecret = process.env.clientSecret

/*
    mutation for social login with github 
*/

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
            // Set the content type header, so that we get the response in JSON
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
                // make a GET request
                method: 'get',
                // to get the code
                url: `https://api.github.com/user?access_token=${accessToken}`,
                // Set the content type header, so that we get the response in JSOn
                headers: {
                    accept: 'application/json'
                }
            }).then(async (response) => {
                console.log(response.data)

                //saving the git user details in the database 
                gitUser = new userModel({
                    gitUsername: response.data.login,
                    gitID: response.data.id,
                    firstName: "guest",
                    lastName: "",
                    email: "",
                    gitToken: accessToken
                })
                let user = await gitUser.save();

                console.log("user", user);
                
                console.log("before token");
                
                //generating token by taking the userID,gitID and git username in the payload 
                var token = await jwt.sign({ userID: user.id, gitUsername: response.data.login, gitID: response.data.id }, 'gitsecret');
                
                console.log("after token");
                console.log('token =>' ,token )
                console.log('email =>' , response.data.email)
                var url = `http://localhost:3000/graphql?token=${token}`
                util.sendEmailFunction(url, response.data.email)
            })
        }
        return { "message": "git authentication successful" }
    }



}




