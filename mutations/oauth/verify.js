// requiring the necessary files

const auth = require('../../types/types').auth;
const userModel = require('../../model/userModel');
const jwt = require('jsonwebtoken');


// value = (token) => {
// var a = token
// }
// console.log(value.a);

/* 
    mutation for email verification
*/

exports.verifyToken = ({
    type: auth,

    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     */
    async resolve(parent, args) {

        // function getToken(token)
        // console.log("context.token",token);
         



        // try {

            //  function (token) => {
            //     console.log(abc);
            // }


            var payload = await jwt.verify(token, "gitsecret"); //token verification
            if (!payload) {
                return {
                    "message": "verification unsuccessful"
                }
            }
            console.log(payload.gitUsername)
            console.log(payload.gitID)
            userUpdate = await userModel.updateOne({ "gitID": payload.gitID }, { $set: { "gitVerify": true } })  // finding the user for the email provided and updating the verification field in the database  
            if (userUpdate) {

                    var user = await userModel.find({"gitID": payload.gitID, "gitUsername":payload.gitUsername})
                    if(!user)
                    {
                        return{"message":"id not found"}
                    }
                    if (user[0].gitVerify === false ) {
                        return {
                            "message": "id not verified"
                        }
                    }
                    return {
                        "message": "login successful"
                    }
            }
            else {
                return {
                    "message": "verification unsuccessful"
                }

            }
        //}
        // catch (err) {
        //     console.log("ERROR: " + err);
        //     return {
        //         "message": err
        //     }

        // }
    }
})