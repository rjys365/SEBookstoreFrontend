export const getWordCountByCategories= async (words) => {
    const response = await fetch('http://localhost:8080/books/wordcount/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: words
    });
    return await response.json();
}