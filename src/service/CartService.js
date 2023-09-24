import {BACKEND_SERVER_ENDPOINT} from "../const/book-const";

export const getCart = async (userId) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'carts/' + userId.toString());
    return await response.json();
}

export const addCartItem = async (userId, bookId, quantity) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'carts/' + userId.toString() + '?operation=add',
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: bookId,
                quantity: quantity
            })
        });
    return response.json();
};

export const setCartItem = async (userId, bookId, quantity) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'carts/' + userId.toString(),
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: bookId,
                quantity: quantity
            })
        });
    return response.json();
}

export const createOrderFromCart = async (userId) => {
    const response = await fetch(BACKEND_SERVER_ENDPOINT + 'orders/async/?userId=' + userId.toString() + '&from=cart',
        {
            method: 'POST',
        });
    return response.json();
}
