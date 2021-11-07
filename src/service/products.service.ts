import {ProductsHelper} from '../DA/DBManager';

export class ProductsService {
    public async getProducts() {
        try {
            const data = await ProductsHelper.getProducts();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
}