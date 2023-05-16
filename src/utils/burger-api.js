const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getProductData = async () => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';

    return fetch(url).then(checkReponse);
}
