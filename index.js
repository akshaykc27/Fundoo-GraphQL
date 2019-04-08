const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
    GraphQLSchema
} = graphql;

var userQueryType = require('./query/query').userQueryType;
var mutation = require('./mutations/index');

exports.userSchema = new GraphQLSchema({
    query: userQueryType,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
})