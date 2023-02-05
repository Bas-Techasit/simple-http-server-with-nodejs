import http from 'http';

import { getProducts, getProduct, postProduct, updateProduct, removeProduct } from './controllers/productController';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (req.url?.match(/\/api\/product\/[\d]+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getProduct(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        postProduct(req, res);
    } else if (req.url?.match(/\/api\/product\/[\d\w]+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if (req.url?.match(/\/api\/product\/[\d\w]+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        removeProduct(req, res, id);
    } else {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify({ message: 'not found'}));
    }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
