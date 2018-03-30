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
image_router.use(bodyParser({limit: '50mb'}));
image_router.use(bodyParser.json());
// to support URL-encoded bodies
image_router.use(bodyParser.urlencoded({
    extended: true
}));

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
        var base64 = req.body.base64
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
    var base64 = req.body.base64
    //var buffer = Buffer.from(base64, 'base64'); //Convert to binary

    mongoose.model('user').findOneAndUpdate({
        'userID': userID
    }, {
        'userImage': base64
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in updating the userImage for the user' + " " + err)
        } else {
            res.send('The userImage was updated for ' + userID)
        }
    });


});

//Delete/Reset a user profile image
image_router.get('/removeuserimage/:userID', function (req, res) {
    //Variables necessary for image update
    var userID = req.params['userID']
    //var buffer = Buffer.from(base64, 'base64'); //Convert to binary

    mongoose.model('user').findOneAndUpdate({
        'userID': userID
    }, {
        'userImage': 'Default Image'
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in deleting the userImage for the user' + " " + err)
        } else {
            res.send('The userImage was deleted for ' + userID)
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
                "doc": doc
            });
        }

    });


});

//Add location image
image_router.post('/uploadlocationimage', function (req, res) {
    //Variables necessary for image update
    var location = req.body.location
    var base64 = req.body.base64
    //var buffer = Buffer.from(base64, 'base64'); //Convert to binary

    mongoose.model('image').create({

        location: location,
        base64: base64

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with adding a location image has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Add location image successful",
                "doc": doc
            });
        }

    });


});


//Get all images for a specific location
image_router.get('/locationimages/:location', function (req, res) {
    var location = req.params['location']

    mongoose.model('image').find({

        "location": location

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving images for a location has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved the images for " + location + " successfully",
                "doc": doc
            });
        }

    });
});

//Use router to clear all images in database
location_router.get('/clearimages', function (req, res) {
    //Return everything in the database
    mongoose.model('image').remove({}, function (err, doc) {
        if (err) {
            res.send('There was an error in clearing all image documents' + " " + err)
        } else {
            //res.send(doc + typeof (doc))
            res.send('All images cleared from database')
        }
    });

});


//Remove all images for a location

export default image_router;