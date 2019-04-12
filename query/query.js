const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
    GraphQLList } = graphql;

const userType = require('../types/types').userType;
const userModel = require('../model/userModel');

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
            }
        }
    }

});
