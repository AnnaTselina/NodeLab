import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Category = mongoose.model('category', CategorySchema);
export default Category;
