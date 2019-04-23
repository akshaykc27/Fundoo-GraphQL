const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL types
    GraphQLList,
    GraphQLString } = graphql;

const userType = require('../types/types').userType;
const labelType = require('../types/types').labelType;
const userModel = require('../model/userModel');
const labelModel = require('../model/labelModel');
const noteModel = require('../model/noteModel');

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
                resolve: async function(parent,args) {
                    var check =  (await userModel.find().exec() || await userModel.find({ "_id": args.userID }).exec()  )
                    // const users1 = await userModel.find({ "_id": args.userID }).exec()
                    
                    // const users = await userModel.find().exec()   //  returns all the users from the database

                    // if(users)
                    // {
                    //     return users;
                    // }
                    // else
                    // {
                    //     return users1;
                    // }




                      if (!check) {
                        throw new Error('ERROR : in query');
                    }
                    return check;
                }
            },

            

           
        }
    }

});
