//requiring all the neccessary dependencies
const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL typed 
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

exports.userType = new GraphQLObjectType({       //defining the schema 
    name: 'user',
    fields: () => ({
        //return {
            firstName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        //}
    })
});

exports.auth = new GraphQLObjectType({
    name: 'auth',
    fields : () => ({
        success : {
            type : GraphQLBoolean
        },

        message: {
            type : GraphQLString
        }

    })
});