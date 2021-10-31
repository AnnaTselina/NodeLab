import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    displayName: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    totalRating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('product', ProductSchema);
export default Product;
