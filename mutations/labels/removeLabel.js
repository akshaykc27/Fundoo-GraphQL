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
    mutation for deleting a label
*/

exports.removeLabel = {
    type: auth,
    args: {
        labelID: {
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

        var payload = await jwt.verify(context.token, "secret");
        // console.log(payload.userID)
        user = labelModel.findByIdAndRemove({ "_id": args.labelID });
        if (!user) {
            return {
                "message": "enter a valid label name"
            }
        }
        else {
            return {
                "message": "label removed successfully"
            }
        }
    }


}



