export async function searchBooksByAuthor(author) {
    const response = await fetch(`http://localhost:8080/search/author/?name=${author}`);
    const data = await response.json();
    return data;
}