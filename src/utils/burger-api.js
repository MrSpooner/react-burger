const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const url = 'https://norma.nomoreparties.space/api/';

export const getProductData = async () => {
    return fetch(url + 'ingredients').then(checkReponse);
}

export const getOrderData = (orderInfo) => {
    return fetch(url + 'orders', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ ingredients: orderInfo })
    }).then(checkReponse);
};