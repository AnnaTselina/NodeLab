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

const handlePostReq = (req, resp) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    })
    req.on('end', () => {
        body = Buffer.concat(body).toString();
        const payload = JSON.parse(body);
        if (Object.keys(payload).length) {
            Products.addProduct(payload);
            resp.end('New product added');
        } else {
            resp.end("An error happened processing the request");
        }

    })

    req.on('error', ()=>{
        resp.end('An error happpened processing the request.');
    })
}

const requestHandler = (req, resp) => {
    if (req.method === 'GET') {
        return handleGetReq(req, resp)
    } else if (req.method === 'POST') {
        return handlePostReq(req, resp)
    }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Error while trying listening server', err)
    }
    console.log(`server is listening on ${port}`)
})