/* 
    requiring the necessary files
*/   

const graphql = require('graphql');
const auth = require('../../types/types').auth
const labelModel = require('../../model/labelModel');
const jwt = require('jsonwebtoken');

/* 
    declaring the graphQL types
*/

const { GraphQLString,  
    GraphQLNonNull } = graphql;

/* 
    mutation for a creating labels
*/

exports.createLabel = {
    type: auth,
    args: {
        labelName: {
            type: new GraphQLNonNull(GraphQLString)
        }

    },

    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     */
    async resolve(parent, args, context) {
        try {
            var payload = await jwt.verify(context.token, "secret");
            console.log(payload.userID)
            var newLabel = new labelModel({
                labelName: args.labelName,
                userID: payload.userID
            })
            user = labelModel.find({ "labelName": args.labelName });
            if (user.length > 0) {
                return {
                    "message": "label already exists"
                }
            }
            labelSave = newLabel.save();
            if (labelSave) {
                return {
                    "message": "label added"
                }
            }
            else {
                return {
                    "message": "error while saving label"
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
