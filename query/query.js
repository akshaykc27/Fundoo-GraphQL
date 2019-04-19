const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
    GraphQLList,
    GraphQLString } = graphql;

const userType = require('../types/types').userType;
const labelType = require('../types/types').labelType;
const userModel = require('../model/userModel');
const labelModel = require('../model/labelModel');

//defining the Query

exports.userQueryType = new GraphQLObjectType({
    name: 'userQuery',
    fields: () => {
        return {
            userDetails: {
                type: new GraphQLList(userType),
                resolve: () => {
                    const users = userModel.find().exec()   //  returns all the users from the database
                    if (!users) {
                        throw new Error('ERROR : in query');
                    }
                    return users;
                }
            },

            labels: {
                type: new GraphQLList(labelType),
                args: {
                    userID: {
                        type: GraphQLString
                    }
                },
                resolve: (parent, args) => {
                    const labels = labelModel.find({ "userID": args.userID })
                    if (!labels) {
                        throw new Error('ERROR : in query');
                    }

                    return labels;

                }
            }
        }
    }

});
