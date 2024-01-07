import {BACKEND_SERVER_ENDPOINT} from "../const/book-const";

export const getBookById = async (bookId) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'books/' + bookId.toString());
    if (response.status !== 200) throw new Error('find book failed');
    return response.json();
}

export const patchBook = async (book) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'books/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    return await response.json();
}

export const postBook = async (book) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'books/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    return await response.json();
}

export const deleteBook = async (bookId) => {
    console.log(bookId);
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'books/' + bookId.toString(), {
        method: 'DELETE'
    });
    return await response.json();
}

export const getTagRelatedBooks = async (relatedTag) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'books/withrelatedtags/' + relatedTag);
    return await response.json();
}
