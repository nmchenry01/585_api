import mongoose, {
  mongo
} from 'mongoose';
import Location from './models/location.js';
import User from './models/user.js';
import Route from './models/route.js';
import Image from './models/image.js';
import location_router from './api/location_router.js';
import image_router from './api/image_router.js';
import user_router from './api/user_router';
import route_router from './api/route_router';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

/*
TODO set express deployment to production
     Add error checking to db connection
     More logging 
     Send back json responses in router 

*/

// Initialize http server
const app = express();
const PORT = 8080;

// Connect to MongoDB

var mongo_url = process.env.MONGO_URL //for deployment
//var test_url = 'mongodb://localhost:27017/mongodb' //for testing
mongoose.connect(mongo_url).catch(function (err) {
  console.log('There was an error connecting to the MongoDB ' + err)
});

//Tell our app to use our router whenever we see api
app.use('/locationapi', location_router);

//Testing routing for images
app.use('/imageapi', image_router);

//Router for user requests
app.use('/userapi', user_router);

//Router for route information
app.use('/routeapi', route_router);

//Autologging to standard out 
//TODO consider redirecting to a file
app.use(morgan('combined'));

//enables cors
app.use(cors());
app.options('*', cors());

//Handle large payloads
app.use(bodyParser({limit: '50mb'}));

// Launch the server on port 8080
const server = app.listen(PORT, () => {
  const {
    address,
    port
  } = server.address();
  console.log(`Listening at http://${address}:${PORT}`);
});