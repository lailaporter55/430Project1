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

//add more information here
//if the user wants to add a book, they need to provide a title and an author
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
}