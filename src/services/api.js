import {INGREDIENTS_URL, ORDER_URL} from "../utils/api";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
}

export const getItemsRequest = async () => {
    return await fetch(INGREDIENTS_URL)
        .then((res) => checkResponse(res));
}

export const getOrderRequest = async (addedIngredients) => {
    return await fetch(ORDER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'ingredients': addedIngredients})
    })
        .then((res) => checkResponse(res));
}
