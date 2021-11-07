import {Router, Response, Request, NextFunction} from "express";
import {ProductsService} from '../service/products.service';
import HttpException from '../exceptions/exceptions'

const productService = new ProductsService();

export const ProductsRouter = (router: Router): void => {
    router.get('/products', async (req: Request, resp: Response, next: NextFunction) => {
        try {
            const data = await productService.getProducts();
            if (data) {
                resp.status(200).json({results: data});
            } else {
                next(new HttpException(400, "Product not found"));
            }
        }
        catch (err) {
            next(err);
        }
    })
}