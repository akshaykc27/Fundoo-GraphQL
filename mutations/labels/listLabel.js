// requiring the necessary files

const graphql = require('graphql');
const { GraphQLString,  //declaring the graphQL types
    GraphQLNonNull } = graphql;

const auth = require('../../types/types').auth
const labelModel = require('../../model/labelModel');

const jwt = require('jsonwebtoken');




// mutation for  a user
exports.listLabel = {
    type: auth,
    args: {
        labelName: {
            type: new GraphQLNonNull(GraphQLString)
        }

    },
    async resolve(parent, args, context) {

        var payload = await jwt.verify(context.token, "secret");
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


}



