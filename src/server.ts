import http from 'http';

import { getProducts, getProduct } from './controllers/productController';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (req.url?.match(/\/api\/product\/[\d]+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        console.log(id);
        getProduct(req, res, id);
    } else {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify({ message: 'not found'}));
    }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
