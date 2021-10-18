const http = require('http');
const qs = require('querystring');
const port = 3000;

const Products = require('./products/products');

const handleGetReq = (req, resp) => {
    if (req.url === '/products') {
        resp.end(Products.getProducts());
    } else {
        resp.end("Listening to requests");
    }
}


const requestHandler = (req, resp) => {
    if (req.method === 'GET') {
        return handleGetReq(req, resp)
    } 
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Error while trying listening server', err)
    }
    console.log(`server is listening on ${port}`)
})