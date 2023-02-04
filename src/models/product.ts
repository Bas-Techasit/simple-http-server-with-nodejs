import products from '../data/products.json';

function findAll(): Promise<unknown> {
    return new Promise( (resolve) => {
        resolve(products)
    })
}

export default { findAll }