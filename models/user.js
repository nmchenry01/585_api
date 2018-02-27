import mongoose, {
    Schema
} from 'mongoose';

// Define user schema
//TODO add more fields as the application changes
//TODO add more verification steps
var locationSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    userReputation: {
        type: Number,
        required: true,
        default: 1
    },
    userImage: {
        type: String,
        required: true,
        default: ''
    },
    previousLikes: [{
        type: String,
        required: true,
        default: ''
    }]
});