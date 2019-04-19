/*****************************************************************************************************
 *                                        CREATE NOTES
 * ***************************************************************************************************/

/* 
    requiring the necessary files
*/

const graphql = require('graphql');
const auth = require('../../types/types').auth
const noteModel = require('../../model/noteModel');
const labelModel = require('../../model/labelModel');
const jwt = require('jsonwebtoken');


/* 
    declaring the graphQL types
*/

const { GraphQLString,
    GraphQLNonNull } = graphql;


/* 
    mutation for a creating notes
*/

function allNotes() {

}

allNotes.prototype.createNote = {
    type: auth,
    args: {
        labelID: {
            type: new GraphQLNonNull(GraphQLString)
        },

        title: {
            type: new GraphQLNonNull(GraphQLString)
        },

        description: {
            type: new GraphQLNonNull(GraphQLString)
        }

    },

    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     */
    async resolve(parent, args, context) {
        try {
            if (args.title.length < 3) {
                return {
                    "message": "title should be minimum of 3 characters"
                }
            }

            if (args.description.length < 5) {
                return {
                    "message": "description should be minimum of 5 characters"
                }
            }

            var payload = await jwt.verify(context.token, "secret");
            console.log(payload.userID)

            // var checklabelID = await labelModel.find({"_id":args.labelID})
            // console.log(args.labelID);
            // console.log(checklabelID);
            // if(!checklabelID )
            // {
            //     return {
            //         "message" : "not a valid id"
            //     }
            // }

            note = await noteModel.find({ "title": args.title });
            if (note.length >0) {
                return {
                    "message": "title already exists"
                }
            }
            var newNote = new noteModel({
                labelID: args.labelID,
                userID: payload.userID,
                title: args.title,
                description: args.description,

            })
            noteSave = newNote.save();
            if (noteSave) {
                return {
                    "message": "note added"
                }
            }
            else {
                return {
                    "message": "error while saving note"
                }
            }



        }
        catch (err) {
            console.log("ERROR: " + err);
            return {
                "message": err
            }

        }
    }

}

/*****************************************************************************************************
 *                                        UPDATE NOTES
 * ***************************************************************************************************/

// mutation for a updating notes

allNotes.prototype.updateNote = {
    type: auth,
    args: {
        noteID: {
            type: new GraphQLNonNull(GraphQLString)
        },

        newTitle: {
            type: new GraphQLNonNull(GraphQLString)
        },

        newDescription: {
            type: new GraphQLNonNull(GraphQLString)
        }

    },
    async resolve(parent, args, context) {

        try {
            var valid = await noteModel.find({"title": args.newTitle})
            if(valid)
            {
                return {
                    "message" : "title already exists"
                }
            }
            var payload = await jwt.verify(context.token, "secret");
            var note = await noteModel.findOneAndUpdate({ "_id": args.noteID },
                { $set: { title: args.newTitle, description: args.newDescription } })
            if (note) {
                return {
                    "message": "note updated successfully"
                }
            }
            else {
                return {
                    "message": "error while updating the note name"
                }
            }

        }

        catch (err) {
            console.log("ERROR: " + err);
            return {
                "message": err
            }

        }


    }
}

/*****************************************************************************************************
 *                                        DELETE NOTES
 * ***************************************************************************************************/

// mutation for a deleting notes 

allNotes.prototype.removeNote = {
    type: auth,
    args: {
        noteID: {
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     */

    async resolve(parent, args) {

        try {
            // console.log(payload.userID)
            note = await noteModel.findByIdAndRemove({ "_id": args.noteID, "title": args.title });
            if (!note) {
                return {
                    "message": "enter a valid title name"
                }
            }
            else {
                return {
                    "message": "note removed successfully"
                }
            }
        }

        catch (err) {
            console.log("ERROR: " + err);
            return {
                "message": err
            }

        }


    }
}

/*****************************************************************************************************
 *                                        ADDING LABELS TO NOTES
 * ***************************************************************************************************/


allNotes.prototype.addLabelNote = {
    type: auth,
    args: {
        noteID: {
            type: new GraphQLNonNull(GraphQLString)
        },

        labelID: {
            type: new GraphQLNonNull(GraphQLString)
        },

    },
    async resolve(parent, args, context) {

        try {
            var valid = await noteModel.find({"labelID": args.labelID})
            if(valid.length > 0)
            {
                return {
                    "message" : "id already exists"
                }
            }
            var note = await noteModel.findOneAndUpdate({ "_id": args.noteID },
                { $push : {"labelID": args.labelID } })
            if (note) {
                return {
                    "message": "note updated successfully"
                }
            }
            else {
                return {
                    "message": "error while updating the note name"
                }
            }

        }

        catch (err) {
            console.log("ERROR: " + err);
            return {
                "message": err
            }

        }


    }
}

/*****************************************************************************************************
 *                                        DELETING LABELS FROM  NOTES
 * ***************************************************************************************************/

allNotes.prototype.removeLabelNote = {
    type: auth,
    args: {
        noteID: { 
            type: new GraphQLNonNull(GraphQLString)
        },

        labelID: {
            type: new GraphQLNonNull(GraphQLString)
        },

    },
    async resolve(parent, args, context) {

        try {
            var valid = await noteModel.find({"labelID": args.labelID})
            if(!valid.length > 0)
            {
                return {
                    "message" : "id does not exist"
                }
            }
            var note = await noteModel.findOneAndUpdate({ "_id": args.noteID },
                { $pull : {"labelID": args.labelID } })
            if (note) {
                return {
                    "message": " label successfully removed  "
                }
            }
            else {
                return {
                    "message": "error while removing the label"
                }
            }

        }

        catch (err) {
            console.log("ERROR: " + err);
            return {
                "message": err
            }

        }


    }
}

module.exports= new allNotes;
