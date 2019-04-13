// requiring the necessary files

const graphql = require('graphql');
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const auth = require('../../types/types').auth
const labelModel = require('../../model/labelModel');

const jwt = require('jsonwebtoken');




// mutation for  a user
exports.removeLabel = {
    type: auth,
    args: {
        labelName: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args, context) {

        var payload = await jwt.verify(context.token, "secret");
        console.log(payload.userID)
        user = labelModel.findByIdAndRemove({ "userID": payload.userID });
        if (!user) {
            return {
                "message": "enter a valid label name"
            }
        }
        else{
            return{
                "message" : "label removed successfully"
            }
        }
    }


}



