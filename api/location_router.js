import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {
    mongo
} from 'mongoose';

//Initialize router
var location_router = express.Router();

// to support JSON-encoded bodies
location_router.use(bodyParser.json());
// to support URL-encoded bodies
location_router.use(bodyParser.urlencoded({
    extended: true
}));

// to support JSON-encoded bodies
location_router.use(express.json());
// to support URL-encoded bodies
location_router.use(express.urlencoded());

//Use router to handle a location POST
location_router.post('/addlocation', function (req, res) {
    // Get values from POST request, uses body of requst
    var title = req.body.title
    var description = req.body.description
    var contributor = req.body.contributor
    var category = req.body.category
    var latitude = req.body.latitude
    var longitude = req.body.longitude

    //call the create function for our database
    mongoose.model('location').create({

        title: title,
        description: description,
        contributor: contributor,
        category: category,
        latitude: latitude,
        longitude: longitude

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with adding a location has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Add location successful",
                "doc": doc
            });
        }

    });

});

//Use router to handle a location GET using title
location_router.get('/getlocation/:title', function (req, res) {

    var title = req.params['title']

    mongoose.model('location').findOne({

        'title': title

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving a location by title has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved a location by title successfully",
                "doc": doc
            });
        }

    });
});

//Use router to retrieve all locations using a GET
location_router.get('/alllocations', function (req, res) {
    //Return everything in the database
    mongoose.model('location').find({}, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving all locations has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved all locations successfully",
                "doc": doc
            });
        }

    });

});

//Use router to clear all locations in database
location_router.get('/clearlocations', function (req, res) {
    //Return everything in the database
    mongoose.model('location').remove({}, function (err, doc) {
        if (err) {
            res.send('There was an error in clearing all documents' + " " + err)
        } else {
            //res.send(doc + typeof (doc))
            res.send('All locations cleared from database')
        }
    });

});

//Use router to clear a location by title in database
location_router.get('/clearonelocation/:title', function (req, res) {
    //Pull request parameter
    var title = req.params['title']

    //Remove the title specified in request
    mongoose.model('location').remove({
        'title': title
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in clearing the document' + " " + err)
        } else {
            //res.send(doc + typeof (doc))
            res.send('The location ' + title + ' was cleared from the database')
        }
    });
});


//Use router to update like/dislike count
location_router.post('/updatelikes', function (req, res) {
    //Read parameters from the body
    var input = req.body.type
    var title = req.body.title


    if (input == 'like') { //Update like count
        mongoose.model('location').findOneAndUpdate({
            'title': title
        }, {
            $inc: {
                "likes": 1
            }
        }, function (err, doc) {
            if (err) {
                res.send(400, {
                    'error': 'An error with updating likes has occured',
                    'err': err
                });
            } else if (!doc) {
                res.send(400, {
                    "error": "No document was found matching that title"
                });
            } else {
                res.send(200, {
                    "success": "Updated the like count successfully",
                    "doc": doc
                });
            }
        });
    } else if (input == 'dislike') { //Update dislike count
        mongoose.model('location').findOneAndUpdate({
            'title': title
        }, {
            $inc: {
                "dislikes": 1
            }
        }, function (err, doc) {
            if (err) {
                res.send(400, {
                    'error': 'An error with updating dislikes has occured',
                    'err': err
                });
            } else if (!doc) {
                res.send(400, {
                    "error": "No document was found matching that title"
                });
            } else {
                res.send(200, {
                    "success": "Updated the dislike count successfully",
                    "doc": doc
                });
            }
        });
    } else {
        res.send(400, {
            'error': "Body parameter for like/dislike is invalid. Please submit either type:like or type:dislike"
        })
    }

});


export default location_router;