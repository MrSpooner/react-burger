const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const BASE_URL = 'https://norma.nomoreparties.space/api/';

export const request = (argUrl, options) => {
    return fetch(BASE_URL + argUrl, options).then(checkResponse)
}

export const getProductData = async () => {
    return request('ingredients');
}

export const getOrderData = (orderInfo) => {
    return request( 'orders', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ ingredients: orderInfo })
    });
};