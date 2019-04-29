// requiring the necessary files

const graphql = require('graphql');
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;
const auth = require('../../types/types').auth
const labelModel = require('../../model/labelModel');
const jwt = require('jsonwebtoken');

// mutation for  a user
exports.updateLabel = {
    type: auth,
    args: {
        labelID: {
            type: new GraphQLNonNull(GraphQLString)
        },

        newLabelName: {
            type: new GraphQLNonNull(GraphQLString)
        },

    },
    async resolve(parent, args, context) {
        try {
            var payload = await jwt.verify(context.token, "secret");
            console.log(payload.userID)
            var label = await labelModel.findOneAndUpdate({ "userID": payload.userID, "_id": args.labelID }, { $set: { labelName: args.newLabelName } })
            console.log(label)
            if (label) {
                return {
                    "message": "label name updated successfully"
                }
            }
            else {
                return {
                    "message": "error while updating the label name"
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


