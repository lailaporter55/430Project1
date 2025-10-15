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
//get books by author or title
//if no params return all books
//GET and HEAD requests
const getBooks = (request, response, params = {}) => {
    const responseJSON = {
        books: [],
    };
    //if params return books that match author or title
    if(params.title) {
        const book = books[params.title];
        if(book) {
            responseJSON.books.push(book);
            return respondJSON(request, response, 200, responseJSON);
        }
        else {
            responseJSON.message = 'No books found with that title.';
            responseJSON.id = 'notFound';
            return respondJSON(request, response, 404, responseJSON);
        }
    }
    if(params.author) {
        const authorBooks = Object.values(books).filter((book) => book.author === params.author);
        if(authorBooks.length > 0) {
            responseJSON.books = authorBooks;
            return respondJSON(request, response, 200, responseJSON);
        }
        else {
            responseJSON.message = 'No books found by that author.';
            responseJSON.id = 'notFound';
            return respondJSON(request, response, 404, responseJSON);
        }
    }
    //if params are not recognized, return all books
    //if no params return all books
    responseJSON.books = Object.values(books);
    return respondJSON(request, response, 200, responseJSON);
};

//add a book
//I will either have this function add a book that is not in the system 
//or it will be to add a book to the users cart 
const requestBook = (request, response, body) => {
    const responseJSON = {
        message: 'Title and author are both required.',
    };
    //check to make sure required fields are there
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


//i am removing the checkout book function, as well as return books 

//ratebook function
//this will be a POST request that
//takes a book title 
//user rates 1-5 
const rateBook = (request, response, body) => {
    //check to make sure required fields are there
    if(!body.title || !body.rating) {
        const responseJSON = {
            message: 'Title and rating are both required.',
            id: 'missingParams',
        };
        return respondJSON(request, response, 400, responseJSON);
    }
    //check that book exists
    if(!books[body.title]) {
        const responseJSON = {
            message: 'The book you are trying to rate does not exist',
            id: 'notFound',
        };
        return respondJSON(request, response, 404, responseJSON);
    }
    //check that rating is between 1 and 5
    if (body.rating < 1 || body.rating > 5) {
        const responseJSON = {
            message: 'Rating must be between 1 and 5',
            id: 'badRating',
        };
        return respondJSON(request, response, 400, responseJSON);
    }
    //add rating to book
    if (body.rating >= 1 || body.rating <= 5) {
        books[body.title].rating = body.rating;
        const responseJSON = {
            message: 'Rating added successfully',
        };
        return respondJSON(request, response, 200, responseJSON);
    }
    
}; 

//if no endpoint found
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    respondJSON(request, response, 404, responseJSON);
}; 


module.exports = {
    getBooks,
    requestBook, 
    rateBook,
    notFound,
    
};