const http = require('http');
const query = require('querystring');
const htmlHander = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, callback) => {
    const body = [];
    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });
    request.on('data', (chunk) => {
        body.push(chunk);
    });
    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);
        callback(request, response, bodyParams);
    });
};

const handleGET = (request, response, parsedURL) => {
    if (parsedURL.pathname === '/') {
        htmlHander.getIndex(request, response);
    }
    else if (parsedURL.pathname === '/style.css') {
        htmlHander.getCSS(request, response);
    }
    else if (parsedURL.pathname === '/getBooks') {
        jsonHandler.getBooks(request, response);
    }
    else {
        jsonHandler.notFound(request, response);
    }
};
const handlePOST = (request, response, parsedURL) => {
    if (parsedURL.pathname === '/addBook') {
        parseBody(request, response, jsonHandler.addBook);
    }
    else {
        jsonHandler.notFound(request, response);
    }
}; 

const handleHEAD = (request, response, parsedURL) => {
    if (parsedURL.pathname === '/getBooks') {
        jsonHandler.getBooks(request, response);
    }
    else {
        jsonHandler.notFound(request, response);
    }
};

const URLStruct = {
    '/': handleGET,
    '/style.css': handleGET,
    '/getBooks': handleGET,
    '/checkoutBook': handlePOST,
    '/returnBook': handlePOST,
    '/rateBook': handlePOST,
    notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
    const protocol = request.conection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);
    request.query = Object.fromEntries(parsedURL.searchParams.entries());

    if (URLStruct[parsedURL.pathname]) {
        URLStruct[parsedURL.pathname](request, response);
    } else {
        URLStruct.notFound(request, response);
    }
};
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});
