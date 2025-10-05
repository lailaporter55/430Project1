const http = require('http');
const query = require('querystring');
const htmlHander = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const URLStruct = {
    GET: {
        '/': htmlHander.getIndex,
        '/style.css': htmlHander.getCSS,
        '/getBooks': jsonHandler.getBooks,
        notFound: jsonHandler.notFound,
    },
    HEAD: {
        '/getBooks': jsonHandler.getBooksMeta,
        notFound: jsonHandler.notFoundMeta,
    },
    POST: {
        '/addBook': jsonHandler.addBook,
        notFound: jsonHandler.notFound,
    },
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
