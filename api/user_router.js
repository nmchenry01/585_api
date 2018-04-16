import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {
    mongo
} from 'mongoose';

//Initialize user_router
var user_router = express.Router();

// to support JSON-encoded bodies
user_router.use(bodyParser.json());
// to support URL-encoded bodies
user_router.use(bodyParser.urlencoded({
    extended: true
}));

// to support JSON-encoded bodies
user_router.use(express.json());
// to support URL-encoded bodies
user_router.use(express.urlencoded());


//Create a user
user_router.post('/adduser', function (req, res) {
    // Get values from POST request
    var userID = req.body.userID
    var username = req.body.username

    //call the create function for our database
    mongoose.model('user').create({

        userID: userID,
        username: username

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with adding a user has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Add user successful",
                "doc": doc
            });
        }

    });

});

//Update a user's liked locations
user_router.post('/updatelikedlocation', function (req, res) {

    var userID = req.body.userID
    var title = req.body.title

    mongoose.model('user').findOneAndUpdate({
        'userID': userID
    }, {
        $push: {
            "previousLikes": title
        }
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in updating the liked locations for the user' + " " + err)
        } else {
            res.send('The location ' + title + ' was added to the liked location list of ' + userID)
        }
    });
});

//Use router to retrieve all locations using a GET
user_router.get('/allusers', function (req, res) {
    //Return everything in the database
    mongoose.model('user').find({}, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving all users has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved all users successfully",
                "doc": doc
            });
        }

    });

});

//Use router to retrieve a specific user
user_router.get('/getuser/:userID', function (req, res) {

    var userID = req.params['userID']

    mongoose.model('user').findOne({

        "userID": userID

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving a specific user has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved the user " + userID + " successfully",
                "doc": doc
            });
        }

    });

});

//Use router to clear all users in database
user_router.get('/clearallusers', function (req, res) {
    //Return everything in the database
    mongoose.model('user').remove({}, function (err, doc) {
        if (err) {
            res.send('There was an error in clearing all documents in users database' + " " + err)
        } else {
            res.send('All users cleared from database')
        }
    });

});


//Update a user's username
user_router.post('/updateusername', function (req, res) {

    var userID = req.body.userID
    var new_username = req.body.new_username

    mongoose.model('user').findOneAndUpdate({
        'userID': userID
    }, {
        'username': new_username
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in updating the username for the user' + " " + err)
        } else {
            res.send('The username ' + new_username + ' was updated for ' + userID)
        }
    });
});

//Update a user's reputation
user_router.post('/updatescore', function (req, res) {
    var userID = req.body.userID
    var score = req.body.score

    mongoose.model('user').findOneAndUpdate({
            'userID': userID
        }, {
            $inc: {
                "userReputation": parseInt(score)
            }
        }, function (err, doc) {
            if (err) {
                res.send(400, {
                    'error': 'An error with updating user reputation has occured',
                    'err': err
                });
            } else if (!doc) {
                res.send(400, {
                    "error": "No document was found matching that user id"
                });
            } else {
                res.send(200, {
                    "success": "Updated the user reputation successfully",
                    "doc": doc
                });
            }
        }

    )
});

//Export to server.js
export default user_router;