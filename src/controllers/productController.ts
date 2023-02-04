import http from 'http';

import Products from '../models/Product';

async function getProducts(_req: http.IncomingMessage,
    res: http.ServerResponse): Promise<void> {
    try {
        const products = await Products.findAll();
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(products));
    } catch (err) {
        console.log(err);
    }
}

async function getProduct(_req: http.IncomingMessage,
    res: http.ServerResponse, id: string): Promise<void> {
    try {
        const product = await Products.findById(id);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(product));
    } catch (err) {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify(err));
    }
}



export { getProducts, getProduct }