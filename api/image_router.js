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
image_router.post('/uploaduserimage/:id', multiparty, function(req, res){
        //Variables necessary for gridfs
        var db = mongoose.connection.db;
        var user_id = req.params['id'];
        var mongoDriver = mongoose.mongo;
        console.log('open')
        var gfs = new gridfs(db, mongoDriver);

});

export default image_router;