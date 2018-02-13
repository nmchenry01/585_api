import mongoose, {
  mongo
} from 'mongoose';
import Location from './models/location.js';
import router from './api/router.js'
import express from 'express';
import morgan from 'morgan';

// Initialize http server
const app = express();
const PORT=8080; 

// Connect to MongoDB
mongoose.connect('mongodb://localhost/location');

//Tell our app to use our router whenever we see api
app.use('/api', router);

//Autologging to standard out 
//TODO consider redirecting to a file
app.use(morgan('combined'));

// Launch the server on port 3000
const server = app.listen(PORT, () => {
  const {
    address,
    port
  } = server.address();
  console.log(`Listening at http://${address}:${PORT}`);
});