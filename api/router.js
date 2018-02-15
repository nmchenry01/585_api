import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {
    mongo
} from 'mongoose';

//Initialize router
var router = express.Router();

// to support JSON-encoded bodies
router.use(bodyParser.json());
// to support URL-encoded bodies
router.use(bodyParser.urlencoded({
    extended: true
}));

// to support JSON-encoded bodies
router.use(express.json());
// to support URL-encoded bodies
router.use(express.urlencoded());

//Use router to handle a location POST
//TODO abstract functionality here out to a seperate API folder
router.post('/addlocation', function (req, res) {
    // Get values from POST request, uses body of requst
    var title = req.body.title
    var description = req.body.description
    var latitude = req.body.latitude
    var longitude = req.body.longitude

    //call the create function for our database
    mongoose.model('location').create({
        title: title,
        description: description,
        latitude: latitude,
        longitude: longitude
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database." + " " + err);
        } else {
            res.send("Added a location to the database"); //Need to add more extensive logging
            //res.json(doc)
        }

    });

});

//Use router to handle a location GET using title
router.get('/getlocation/:title', function (req, res) {
    var title = req.params['title']

    mongoose.model('location').findOne({
        'title': title
    }, function (err, doc) {
        if (err) {
            res.send('There was an error in finding one document by location' + " " + err)
        } else {
            //res.send(doc + ' ' + title)
            res.json(doc)
        }
    });
});

//Use router to retrieve all locations using a GET
router.get('/alllocations', function (req, res) {
    //Return everything in the database
    mongoose.model('location').find({}, function (err, doc) {
        if (err) {
            res.send('There was an error in finding all documents'  + " " + err)
        } else {
            //res.send(doc + typeof (doc))
            res.json(doc)
        }
    });

});

//Use router to clear all locations in database
router.get('/clearlocations', function (req, res) {
    //Return everything in the database
    mongoose.model('location').remove({}, function (err, doc) {
        if (err) {
            res.send('There was an error in clearing all documents'  + " " + err)
        } else {
            //res.send(doc + typeof (doc))
            res.send('All locations cleared from database')
        }
    });

});

export default router;