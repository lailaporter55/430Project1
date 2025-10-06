//for the milestone checkpoint i am using books and making sure everything works
//before i decide if i want to change my dataset 
const books = {};

const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
    response.writeHead(status, { 
        'Content-Type': 'application/json', 
        'Content-Length': Buffer.byteLength(content, 'utf8')
    });
    if(request.method !== 'HEAD' && status !== 204) {
        response.write(content);
    }
    response.end();
};

const getBooks = (request, response) => {
    const responseJSON = {
        books,
    };
    respondJSON(request, response, 200, responseJSON);
}

//add a book
//I will either have this function add a book that is not in the system 
//or it will be to add a book to the users cart 
const addBook = (request, response, body) => {
    const responseJSON = {
        message: 'Title and author are both required.',
    };

    if(!body.title || !body.author) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let status = 204;
    const{ title, author, read = false } = request.body;
    if(books[body.title]) {
        status = 204;
        books[title]= {};
}
    books[title] = title; 
    books[author] = author;

    if(status === 201) {
        responseJSON.message = 'Created Successfully';
        respondJSON(request, response, status, responseJSON);
        return respondJSON(request, response, status, responseJSON);
    }
    return respondJSON(request, response, status);
}; 

const checkOutBook = (request, response, body) => {
    const responseJSON = {
        message: 'Title and author are both required.',
    };

    if(!body.title || !body.author) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let status = 204;
    const{ title, author, read = false } = request.body;
    if(books[body.title]) {
        status = 204;
        books[title]= {};
}
    books[title] = title; 
    books[author] = author;

    if(status === 201) {
        responseJSON.message = 'Added to Cart!';
        respondJSON(request, response, status, responseJSON);
        return respondJSON(request, response, status, responseJSON);
    }
    return respondJSON(request, response, status);
};
//since there would be a checkout book there would need to be
//remove a book from cart function as well

//if the book is read by the user the user will be able to rate the book 
//this will be a POST request 

module.exports = {
    getBooks,
    addBook,
    checkOutBook,
};