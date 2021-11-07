import ProductModel from '../mongoDB/models/product.model';

class ProductsTypegooseHelper {
    async getProducts() {
        const data = await ProductModel.find();
        return data;
    }
}

export default ProductsTypegooseHelper;