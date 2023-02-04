import http from 'http';

import Products from '../models/Product';

async function getProduct(_req: http.IncomingMessage,
                             res: http.ServerResponse): Promise<void> {
    try {
        const products = await Products.findAll();
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(products));
    } catch(err) {
        console.log(err);
    }
}

export { getProduct }