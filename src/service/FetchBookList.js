
export async function fetchBookList() {
    const response = await fetch('http://localhost:8080/books/');
    const data = await response.json();
    return data;
}