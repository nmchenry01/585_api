import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {
    mongo
} from 'mongoose';
import fs from 'fs';
import gridfs from 'gridfs-stream';
import os from 'os';
import multiparty from 'connect-multiparty';

//Initialize router
var image_router = express.Router();

// to support JSON-encoded bodies
image_router.use(bodyParser.json());
// to support URL-encoded bodies
image_router.use(bodyParser.urlencoded({
    extended: true
}));

// to support JSON-encoded bodies
image_router.use(express.json());
// to support URL-encoded bodies
image_router.use(express.urlencoded());

//Test to see if we have accesss to db connection
image_router.get('/', function (req, res) {
    console.log(mongoose.connection.db)
    res.send('Hello World')
});

//Test
image_router.get('/uploadtest', function (req, res) {
    //Variables necessary for gridfs
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    console.log('open')
    var gfs = new gridfs(db, mongoDriver);

    var writestream = gfs.createWriteStream({
        filename: 'test_file.txt'
    });

    fs.createReadStream("api/test_file.txt").pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
        res.send('Success')
    });
});

//Upload user image
/*
image_router.post('/uploaduserimage', multiparty, function(req, res){
        //Variables necessary for gridfs
        var db = mongoose.connection.db;
        var userID = req.body.userID
        var base_64_pic = req.body.base64
        var mongoDriver = mongoose.mongo;
        console.log('open')
        var gfs = new gridfs(db, mongoDriver);

        var writestream = gfs.createWriteStream({

        });

});
*/

//Upload user profile image
image_router.post('/uploaduserimage', function (req, res) {
    //Variables necessary for image update
    var userID = req.body.userID
    var base_64 = req.body.base64
    //var buffer = Buffer.from(base_64, 'base64'); //Convert to binary

    mongoose.model('user').findOneAndUpdate({
        'userID': userID
    }, {
        'userImage': base_64
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in updating the userImage for the user' + " " + err)
        } else {
            res.send('The userImage was updated for ' + userID)
        }
    });


});

//Get user profile image
image_router.get('/getuserimage/:userID', function (req, res) {
    var userID = req.params['userID']

    //Get user by userID
    mongoose.model('user').findOne({

        "userID": userID

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving a specific userImage has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved the userImage for " + userID + " successfully",
                "doc": doc['userImage']
            });
        }

    });


});

export default image_router;