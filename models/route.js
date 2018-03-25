import mongoose, {
    Schema
} from 'mongoose';

// Define route schema
var routeSchema = new Schema({
    operator: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    stop: {
        type: String,
        default: 'No Stop Specified'
    },
    walkingDescription: {
        type: String,
        default: 'No Walking Description Specified'
    }
}); 

// Export Mongoose model
export default mongoose.model('route', routeSchema);