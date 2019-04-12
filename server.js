// requiring the necessary files

const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const dbConfig = require('./config/configURL');
require('dotenv').config();

const app = express();

// listening to port
app.listen(process.env.port, () => {
    console.log("listening to port "+process.env.port);
}); 

// creating the graphql API
const userSchema = require('./index').userSchema
app.use('/graphql', bodyParser.json(), graphqlHTTP ( request => ({
    schema: userSchema,
    graphiql : true,
    context:{token:request.headers.authorization},
})));
            

// to configure mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = app;