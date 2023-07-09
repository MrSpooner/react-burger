import {
    updateToken,
    getUserData,
    loginRequest,
    registerRequest,
    logoutRequest,
    updateUserData,
    resetRequest,
    forgotRequest,
} from "../../utils/burger-api";
import { Dispatch } from 'redux'
import {AnyAction} from "redux"
import { setCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const UPDATE_TOKEN_REQUEST = "RESET_PASSWORD_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const UPDATE_TOKEN_ERROR = "RESET_PASSWORD_ERROR";

export function registerUser(mail:string, password:string, name:string) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        });

        registerRequest(mail, password, name)
            .then((res) => {
                if (res && res.success) {
                    setCookie("token", res.accessToken, { expires: 1200 }); //20 мин
                    localStorage.setItem("jwt", res.refreshToken);

                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({
                        type: REGISTER_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_ERROR,
                });
            });
    };
}

export function login(email:string, password:string) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });

        loginRequest(email, password)
            .then((res) => {
                if (res.success) {
                    setCookie("token", res.accessToken, { expires: 1200 });
                    localStorage.setItem("jwt", res.refreshToken);

                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({
                        type: LOGIN_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_ERROR,
                });
            });
    };
}

export function logout() {
    return function (dispatch: Dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });

        logoutRequest()
            .then((res) => {
                if (res.success) {
                    setCookie("token", "", { expires: -1 });
                    localStorage.removeItem("jwt");

                    dispatch({
                        type: LOGOUT_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({
                        type: LOGOUT_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: LOGOUT_ERROR,
                });
            });
    };
}

export function requestForgot(email: string) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
        });

        forgotRequest(email)
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_REQUEST,
                    });
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                });
            });
    };
}

export function resetPassword(password: string, token: string) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });

        resetRequest(password, token)
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: RESET_PASSWORD_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                });
            });
    };
}

export function refreshToken() {
    return function (dispatch: Dispatch<AnyAction>) {
        dispatch({
            type: UPDATE_TOKEN_REQUEST,
        });

        updateToken()
            .then((res) => {
                if (res.success) {
                    setCookie("token", res.accessToken, { expires: 1200 });
                    localStorage.setItem("jwt", res.refreshToken);

                    dispatch({
                        type: UPDATE_TOKEN_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: UPDATE_TOKEN_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_TOKEN_ERROR,
                });
            });
    };
}

export function updateUser(name: string, email:string, password:string) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST,
        });

        updateUserData(name, email, password)
            .then((res) => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: res.user,
                });
            })
            .catch(() => {
                if (localStorage.getItem("jwt")) {
                    dispatch(refreshToken() as any);
                    dispatch(updateUser(name, email, password) as any);
                } else {
                    dispatch({
                        type: UPDATE_USER_ERROR,
                    });
                }
            });
    };
}

export function getUser() {
    return function (dispatch: Dispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        });

        getUserData()
            .then((res) => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: res.user,
                });
            })
            .catch(() => {
                if (localStorage.getItem("jwt")) {
                    dispatch(refreshToken() as any);

                    getUserData().then((res) => {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            user: res.user,
                        });
                    });
                } else {
                    dispatch({
                        type: GET_USER_ERROR,
                    });
                }
            });
    };
}