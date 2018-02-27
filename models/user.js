import mongoose, {
    Schema
} from 'mongoose';

// Define user schema
//TODO add more fields as the application changes
//TODO add more verification steps
var userSchema = new Schema({
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
        default: 'No Image'
    },
    previousLikes: [{
        type: String,
        required: true,
        default: ''
    }]
});

// Export Mongoose model
export default mongoose.model('user', userSchema);