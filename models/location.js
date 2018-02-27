import mongoose, {
    Schema
} from 'mongoose';

// Define location schema
//TODO add more fields as the application changes
//TODO add more verification steps
var locationSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        min: -85,
        max: 85
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    }
}); 

// Export Mongoose model
export default mongoose.model('location', locationSchema);