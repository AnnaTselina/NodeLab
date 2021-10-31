import Product from '../mongoDB/Models/Product.model.js';

export const getAllProducts = async () => {
    return await Product.find();
}