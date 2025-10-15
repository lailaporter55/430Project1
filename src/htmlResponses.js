const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const css = fs.readFileSync(`${__dirname}/../client/styles.css`);
const notFoundPage = fs.readFileSync(`${__dirname}/../client/notFound.html`);

const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};


const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
}

const getnotFound = (request, response) => {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('<h1>404 Not Found</h1>');
    response.end();
};

module.exports = {
    getIndex,
    getCSS,
    getnotFound,
};