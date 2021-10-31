import Product from '../mongoDB/Models/Product.model.js';

export const getAllProducts = async () => {
    const res = await Product.find();
    return res;
}