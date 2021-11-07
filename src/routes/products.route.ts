import {Router, Response, Request, NextFunction} from "express";

export const ProductsRouter = (router: Router): void => {
    router.get('/products', async (req: Request, resp: Response, next: NextFunction) => {
        try {
            /* const data = await service.GetProducts();
            if (data) {
                resp.status(200).json({results: data});
            } else {
            resp.status(400).json({errorMessage: "Products not found"});
            }*/
            resp.status(200).json({results: []});
        }
        catch (err) {
            next(err);
        }
    })
}