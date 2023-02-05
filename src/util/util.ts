import fs from 'fs';
import path from 'path';
import http from 'http';

function writeDataToFile(content: string): void {
    const filePath = path.join(__dirname, '../data/products.json')
        fs.writeFile(filePath, content, (err) => {
            if(err) console.log(err);
        });
}

function getPostData(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on("data", (stream) => {
                body += stream.toString();
            });
            req.on('end', async () => {
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }
            
    })
}

export { writeDataToFile, getPostData };