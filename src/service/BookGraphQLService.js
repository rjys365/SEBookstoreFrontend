import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://localhost:8080/graphql'

const graphQLClient = new GraphQLClient(endpoint);

export async function getBooksGraphQL() {
    const query = gql`
        query {
            allBooks {
                id
                image
                title
                price
            }
        }
    `;
    const data = await graphQLClient.request(query);
    return data.allBooks;
}

export async function getBookByTitleContainingGraphQL(title){
    const query = gql`
    query($title: String!){
        searchBooksByTitle(titleContains: $title){
            id
            image
            title
            price
        }
    }`
    const variables = {
        title: title
    }
    const data = await graphQLClient.request(query, variables);
    return data.searchBooksByTitle;
}
