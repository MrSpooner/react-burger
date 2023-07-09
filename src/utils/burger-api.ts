import {getCookie} from "./cookie";

const requestParams = {
    baseURL: "https://norma.nomoreparties.space/api/",
    headers: {
        "Content-type": "application/json",
    },
};

function request(url:string, options:any) {
    return fetch(url, options).then(checkResponse);
}

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const registerRequest = (email:string, password:string, name:string) => {
    return request(`${requestParams.baseURL}auth/register`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({email, password, name}),
    });
};

export const loginRequest = (email:string, password:string) => {
    return request(`${requestParams.baseURL}auth/login`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({email, password}),
    });
};

export const logoutRequest = () => {
    return request(`${requestParams.baseURL}auth/logout`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({token: localStorage.getItem("jwt")}),
    });
};

export const forgotRequest = (email:string) => {
    return request(`${requestParams.baseURL}password-reset`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({email}),
    });
};

export const resetRequest = (password:string, token: string) => {
    return request(`${requestParams.baseURL}password-reset/reset`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({password, token}),
    });
};

export const updateToken = () => {
    return request(`${requestParams.baseURL}auth/token`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({token: localStorage.getItem("jwt")}),
    });
};


export const updateUserData = (name:string, email:string, password:string) => {
    return request(`${requestParams.baseURL}auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getCookie("token")}`,
        },
        body: JSON.stringify({name, email, password}),
    });
};

export const getUserData = () => {
    return request(`${requestParams.baseURL}auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getCookie("token")}`,
        },
    });
};

export const getProductData = () => {
    return request(`${requestParams.baseURL}ingredients`, {
        method: "GET",
        headers: requestParams.headers,
    });
};

export const getOrderData = (orderInfo:string[]) => {
    return request(`${requestParams.baseURL}orders`, {
        method: "POST",
        headers: requestParams.headers,
        body: JSON.stringify({ingredients: orderInfo}),
    });
};