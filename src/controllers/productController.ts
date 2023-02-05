import http from 'http';

import Products from '../models/Product';
import { getPostData } from '../util/util';

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

async function postProduct(req: http.IncomingMessage,
    res: http.ServerResponse): Promise<void> {
    try {
        const body = await getPostData(req);
        const product = JSON.parse(body);

        const newProduct = await Products.createProduct(product);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newProduct));

    } catch (err) {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify(err));
    }
}

async function updateProduct(req: http.IncomingMessage,
    res: http.ServerResponse, id: string): Promise<void> {
    try {
        const body = await getPostData(req);
        const product = JSON.parse(body);
        const { name, description, price } = await Products.findById(id);
        const newProduct = {
            id: id,
            name: product.name || name,
            description: product.description || description,
            price: product.price || price
        }
        const updatedProduct = await Products.update(id, newProduct)
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(updatedProduct));
    } catch (err) {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify(err));
    }
}


async function removeProduct(req: http.IncomingMessage,
    res: http.ServerResponse, id: string): Promise<void> {
    try {
        await Products.findById(id);
        await Products.remove(id);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: `Product id: ${id} removed`}));
    } catch (err) {
        res.setHeader('Content-type', 'application/json')
        res.setHeader('status', 404);
        res.end(JSON.stringify(err));
    }
}





export { getProducts, getProduct, postProduct, updateProduct, removeProduct }