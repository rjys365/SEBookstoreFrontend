import {BACKEND_SERVER_ENDPOINT} from "../const/book-const";

export const getBookById = async (bookId) => {
    const response=await fetch(BACKEND_SERVER_ENDPOINT+'books/'+bookId.toString());
    if(response.status!==200)throw new Error('find book failed');
    return response.json();
}