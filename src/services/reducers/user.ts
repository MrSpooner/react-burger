import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_ERROR,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,

    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_ERROR,

    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_ERROR,

    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_ERROR,

    GET_USER_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_ERROR,
} from "../actions/user";

const initialState = {
    user: {
        name: "",
        email: "",
    },

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    forgotRequest: false,
    forgotRequestFailed: false,

    resetRequest: false,
    resetFailed: false,

    tokenRequest: false,
    tokenFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    isAuth: false,
};

export const user = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerUserRequest: true,
                registerUserFailed: false,
            };
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerUserRequest: false,
                registerUserFailed: false,
                isAuth: true,
                user: action.user,
            };
        }

        case REGISTER_ERROR: {
            return {
                ...state,
                registerUserRequest: false,
                registerUserFailed: true,
            };
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginUserRequest: true,
                loginUserFailed: false,
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginUserRequest: false,
                loginUserFailed: false,
                isAuth: true,
                user: action.user,
            };
        }

        case LOGIN_ERROR: {
            return {
                ...state,
                loginUserRequest: false,
                loginUserFailed: true,
            };
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
            };
        }

        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: false,
                isAuth: true,
                user: action.user,
            };
        }

        case GET_USER_ERROR: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
            };
        }

        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            };
        }

        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: false,
                user: action.user,
            };
        }

        case UPDATE_USER_ERROR: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
            };
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutUserRequest: true,
                logoutUserFailed: false,
            };
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutUserRequest: false,
                logoutUserFailed: false,
                isAuth: false,
            };
        }

        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutUserRequest: false,
                logoutUserFailed: true,
            };
        }

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                codeRequest: false,
                codeRequestFailed: false,
            };
        }

        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                codeRequest: true,
                codeRequestFailed: false,
            };
        }

        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                codeRequest: false,
                codeRequestFailed: true,
            };
        }

        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetRequest: false,
                resetFailed: false,
            };
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false,
            };
        }

        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true,
            };
        }

        case UPDATE_TOKEN_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: false,
            };
        }

        case UPDATE_TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false,
            };
        }

        case UPDATE_TOKEN_ERROR: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: true,
            };
        }

        default: {
            return state;
        }
    }
};