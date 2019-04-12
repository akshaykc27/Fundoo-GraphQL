//requiring all the neccessary files
const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL typed 
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

exports.userType = new GraphQLObjectType({       //defining the schema or type 
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

exports.auth = new GraphQLObjectType({          //defining the schema or type 
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