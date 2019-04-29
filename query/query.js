const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
    GraphQLList,
    GraphQLString, } = graphql;

const userType = require('../types/types').userType;
const userModel = require('../model/userModel');


//defining the Query

exports.userQueryType = new GraphQLObjectType({
    name: 'userQuery',
    fields: () => {
        return {
            userDetails: {
                type: new GraphQLList(userType),
                args: {
                    userID: {
                        type: GraphQLString
                    },
                    labelID: {
                        type : GraphQLString
                    }
                },
               async resolve(parent,args) {
                    var check =  ( await userModel.find({ "_id": args.userID }).exec() || await userModel.find().exec())
                      if (!check) {
                        throw new Error('ERROR : in query');
                    }
                    return check;
                }
            }
        }
    }
});
