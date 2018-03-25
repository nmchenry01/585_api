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
    }
}); 

// Export Mongoose model
export default mongoose.model('route', routeSchema);