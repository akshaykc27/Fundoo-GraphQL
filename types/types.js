//requiring all the neccessary files
const graphql = require('graphql');
const { GraphQLObjectType,    //declaring the graphQL typed 
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList
} = graphql;

const labelModel = require('../model/labelModel')
const noteModel = require('../model/noteModel')

const userType = new GraphQLObjectType({       //defining the schema or type 
    name: 'user',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            firstName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            lastName : {
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            labels: {                                           //to fetch and list all the labels linked to a particular user
                type: new GraphQLList(labelType),

                async resolve(parent, args) {
                    try {
                        console.log(parent);
                        var labels = await labelModel.find({ "userID": parent.id });
                        if (!labels) {
                            return {
                                "message": "no labels found "
                            }
                        }
                        return labels;
                    }
                    catch (err) {
                        console.log("ERROR : ", err);

                    }

                }
            },
            notes: {                                  //to fetch and list all the notes linked to a particular user
                type: new GraphQLList(noteType),

                async resolve(parent, args) {
                    try {
                        console.log(parent);
                        var notes = await noteModel.find({ "userID": parent.id });
                        if (!notes) {
                            return {
                                "message": "no notes found"
                            }
                        }
                        return notes;
                    }
                    catch (err) {
                        console.log("ERROR : ", err);

                    }
                }

            }
        }
    }
})

const auth = new GraphQLObjectType({          //defining the schema or type 
    name: 'auth',
    fields: () => ({
        success: {
            type: GraphQLBoolean
        },

        message: {
            type: GraphQLString
        },

        token: {
            type: GraphQLString
        }
    })
});
const labelType = new GraphQLObjectType({       //defining the schema or type 
    name: 'labels',
    fields: () => ({
        labelName: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

const noteType = new GraphQLObjectType({
    name: 'noteUser',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            labelID: {
                type: GraphQLString
            },
            userID: {
                type: GraphQLString
            }
        }
    }
});

module.exports = {
    noteType,
    labelType,
    auth,
    userType
}
