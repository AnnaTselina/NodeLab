const { Console } = require('console');
const http = require('http');
const port = 3000;
const PRODUCTS_URL = "/products"

const ProductsHelpers = require('./products/products');

const handleProductsRequest = (req, resp) =>{
    if (req.method === "GET") {
        const products = ProductsHelpers.getProducts();
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(products));
    } else if (req.method === "POST") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const payload = JSON.parse(body);
            const requiredParams = ["displayName", "price"];
            const missedParams = requiredParams.filter(param => !payload[param]);
            if (missedParams.length) {
                const errorMessage = {errorMessage: "Missing params: " + missedParams.join()};
                resp.writeHead(400, { "Content-Type": "application/json" });
                resp.end(JSON.stringify(errorMessage));
            } else {
                ProductsHelpers.addProduct(payload);
                resp.writeHead(201, { "Content-Type": "application/json" });
                resp.end(body);
            }
    
        })
        req.on('error', ()=>{
            const errorMessage = {errorMessage: "An error happpened processing the request."}
            resp.writeHead(500, { "Content-Type": "application/json" });
            resp.end(JSON.stringify(errorMessage));
        })
    }
}

const requestHandler = (req, resp) => {
    if (req.url === PRODUCTS_URL) {
        handleProductsRequest(req, resp);
    } else {
        resp.end("Listening to your requests")
    }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Error while trying listening server', err)
    }
    console.log(`server is listening on ${port}`)
})