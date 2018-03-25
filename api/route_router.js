import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {
    mongo
} from 'mongoose';

//Initialize router
var route_router = express.Router();

// to support JSON-encoded bodies
route_router.use(bodyParser.json());
// to support URL-encoded bodies
route_router.use(bodyParser.urlencoded({
    extended: true
}));

// to support JSON-encoded bodies
route_router.use(express.json());
// to support URL-encoded bodies
route_router.use(express.urlencoded());

//Use router to handle a route POST
route_router.post('/addroute', function (req, res) {
    // Get values from POST request
    var operator = req.body.operator
    var name = req.body.name
    var stop = req.body.stop
    var walkingDescription = req.body.walkingDescription

    //Test for var existence 
    if (!stop) {
        stop = 'No Stop Specified'
    }
    if (!walkingDescription) {
        walkingDescription = 'No Walking Description Specified'
    }

    //call the create function for our database
    mongoose.model('route').create({

        operator: operator,
        name: name,
        stop: stop,
        walkingDescription: walkingDescription

    }, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with adding a route has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Add route successful",
                "doc": doc
            });
        }

    });

});

//Get all routes
route_router.get('/allroutes', function (req, res) {
    //Return everything in the database
    mongoose.model('route').find({}, function (err, doc) {

        if (err) {
            res.send(400, {
                'error': 'An error with retrieving all routes has occured',
                'err': err
            });
        } else {
            res.send(200, {
                "success": "Retrieved all routes successfully",
                "doc": doc
            });
        }

    });

});

export default route_router;