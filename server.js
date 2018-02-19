import mongoose, {
  mongo
} from 'mongoose';
import Location from './models/location.js';
import router from './api/router.js'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

/*
TODO set express deployment to production
     Add error checking to db connection
     More logging 
     Send back json responses in router 

*/

// Initialize http server
const app = express();
const PORT=8080; 

// Connect to MongoDB

var mongo_url = process.env.MONGO_URL //for deployment
//var test_url = 'mongodb://localhost/mongodb' //for testing
mongoose.connect(mongo_url);

//Tell our app to use our router whenever we see api
app.use('/api', router);

//Autologging to standard out 
//TODO consider redirecting to a file
app.use(morgan('combined'));

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// Launch the server on port 8080
const server = app.listen(PORT, () => {
  const {
    address,
    port
  } = server.address();
  console.log(`Listening at http://${address}:${PORT}`);
});