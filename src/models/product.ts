import products from '../data/products.json';

function findAll(): Promise<unknown> {
    return new Promise( (resolve) => {
        resolve(products)
    })
}

function findById(id: string): Promise<unknown> {
    return new Promise ( (resolve, reject) => {
        const product = products.find( p => p.id === id);
        if (product) {
            resolve(product);
        } else {
            reject({ message: 'not found' });
        }
    })
}

export default { findAll, findById }