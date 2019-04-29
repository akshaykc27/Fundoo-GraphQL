/*
     requiring the necessary files
*/
var auth = require('../types/types').auth;
userModel = require('../model/userModel');
jwt = require('jsonwebtoken');

/*
    mutation for uploading the image 
*/
exports.imageUpload = ({
    type: auth,
    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     */
    async resolve(parent, args, context) {
        try {
            if (context.token) {
                payload = await jwt.verify(context.token, 'secret') //verifying the token of the user logged to get the userID
                console.log("Image url => ", context.request.file.location); // shows the url of the image saved in s3
                updateUrl = await userModel.findOneAndUpdate({ _id: payload.userID },
                    { $set: { imageUrl: context.request.file.location } }) //saving the url o the image in the database
                if (updateUrl) {
                    return {
                        "message": "image uploaded successfully",
                        imageUrl: context.request.file.location 
                    }
                }
            }
            else {
                return {
                    "message": "token not provided",

                }
            }
        }
        catch (err) {
            console.log("ERROR: ", err)
        }
    }
})
