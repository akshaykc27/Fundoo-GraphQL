const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
    GraphQLSchema
} = graphql;

var userQueryType = require('./query/query').userQueryType;
var mutation = require('./mutations/index');

exports.userSchema = new GraphQLSchema({   // defining the user schema
    query: userQueryType,
    mutation: mutation
})