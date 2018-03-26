import mongoose, {
    Schema
} from 'mongoose';

// Define image schema
var imageSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    base64: {
        type: String,
        required: true
    }
});

// Export Mongoose model
export default mongoose.model('image', imageSchema);