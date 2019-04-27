// requiring the necessary files

const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const dbConfig = require('./config/configURL');
const redis = require('redis');

var client = redis.createClient();
require('dotenv').config();

const app = express();

//to check redis cache connection
client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

// to configure mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to the database");
})
mongoose.connection.on("disconnected", () => {
    console.log('Could not connect to the database ');
    process.exit();
})
mongoose.connection.on("error", () => {
    console.log('error while connecting to the database ');
    process.exit(1);
})
// listening to port
app.listen(process.env.port, () => {
    console.log("listening to port " + process.env.port);
});

//aws-s3 api for uploading an image 
var aws = require('aws-sdk')
var multer = require('multer')
var upload = multer();
var multerS3 = require('multer-s3')
var s3 = new aws.S3({
    region: 'ap-south-1',
    accessKeyId: 'AKIAYR77OBXZLLLTI5ZH',
    secretAccessKey: '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',
    s3Url: 'https://my-s3-url.com/.jpg', /* optional */
})
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'myfundoo',
        metadata: function (req, file, callback) {
            callback(null, { fieldName: file.fieldname });
        },
        key: function (req, file, callback) {
            callback(null, Date.now().toString())
        }
    })
})

// creating the graphql API
const userSchema = require('./index').userSchema
app.use('/graphql', bodyParser.json(), upload.single('image'), graphqlHTTP(request => ({
    schema: userSchema,
    graphiql: true,
    context: {
        token: request.query.token,
        code: request.query.code,
        access_token: request.query.access_token,
        request: request
    }

})));



module.exports = app;