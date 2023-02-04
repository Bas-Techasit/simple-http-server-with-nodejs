import http from 'http';

import { getProduct } from './controllers/productController';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/api/products' && req.method === 'GET') {
        getProduct(req, res);
    } else {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify({ message: 'not found'}));
    }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
