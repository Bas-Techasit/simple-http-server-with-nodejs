import { v4 as uuidv4 } from 'uuid'

import products from '../data/products.json';
import { writeDataToFile } from '../util/util';

function findAll(): Promise<unknown> {
    return new Promise( (resolve) => {
        resolve(products)
    })
}

function findById(id: string): Promise<prodcut> {
    return new Promise ( (resolve, reject) => {
        const product = products.find( p => p.id === id);
        if (product) {
            resolve(product);
        } else {
            reject({ message: 'not found' });
        }
    })
}

type prodcut = {
    id?: string
    name: string;
    description: string;
    price: number;
}

function createProduct(product: prodcut): Promise<unknown> {
    return new Promise ( (resolve,) => {
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct);
        const data = JSON.stringify(products);
        writeDataToFile(data)
        resolve(newProduct);
    });
}

type updateProduct = {
    id: string
    name: string;
    description: string;
    price: number;
}

function update(id: string, newProduct: updateProduct): Promise<updateProduct> {
    return new Promise((resolve,) => {
        const index = products.findIndex( p => p.id === id);
        products[index] = newProduct;
        writeDataToFile(JSON.stringify(products));
        resolve(newProduct);
    })
}

function remove(id: string): Promise<void> {
    return new Promise((resolve) => {
        const deletedProducts = products.filter( p => p.id !== id);
        writeDataToFile(JSON.stringify(deletedProducts));
        resolve();
    })
}

export default { findAll, findById, createProduct, update, remove }