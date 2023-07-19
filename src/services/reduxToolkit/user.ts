import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setCookie} from "../../utils/cookie";
import {
    registerRequest,
    loginRequest,
    logoutRequest,
    getUserData,
    updateToken,
    updateUserData,
    forgotRequest,
    resetRequest
} from "../../utils/burger-api";

type TUser = {
    name: string;
    email: string;
};

interface IInitialState {
    user: {
        name: string;
        email: string;
    };

    registerUserRequest: boolean;
    registerUserFailed: boolean;

    loginUserRequest: boolean;
    loginUserFailed: boolean;

    updateUserRequest: boolean;
    updateUserFailed: boolean;

    getUserRequest: boolean;
    getUserFailed: boolean;

    logoutUserRequest: boolean;
    logoutUserFailed: boolean;

    forgotRequest: boolean;
    forgotRequestFailed: boolean;

    resetRequest: boolean;
    resetFailed: boolean;

    tokenRequest: boolean;
    tokenFailed: boolean;

    isAuth: boolean;
}

const initialState: IInitialState = {
    user: {
        name: "",
        email: "",
    },

    registerUserRequest: false,
    registerUserFailed: false,

    loginUserRequest: false,
    loginUserFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    logoutUserRequest: false,
    logoutUserFailed: false,

    forgotRequest: false,
    forgotRequestFailed: false,

    resetRequest: false,
    resetFailed: false,

    tokenRequest: false,
    tokenFailed: false,

    isAuth: false,
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async ({email, password, name}: { email: string; password: string; name: string; }) => {
        const res = await registerRequest(email, password, name);

        setCookie("token", res.accessToken, {expires: 1200});
        localStorage.setItem("jwt", res.refreshToken);

        return res.user;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}: { email: string; password: string }) => {
        const res = await loginRequest(email, password);

        setCookie("token", res.accessToken, {expires: 1200});
        localStorage.setItem("jwt", res.refreshToken);

        return res.user;
    }
);

export const logout = createAsyncThunk("user/logout", async () => {
    const res = await logoutRequest();

    setCookie("token", "", {expires: -1});
    localStorage.removeItem("jwt");

    return res;
});

export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
        const res = await updateToken();

        setCookie("token", res.accessToken, {expires: 1200});
        localStorage.setItem("jwt", res.refreshToken);

        return res;
    }
);

export const getUser = createAsyncThunk<TUser, undefined,
    { rejectValue: string }>("user/getUser", async () => {
    const res = await getUserData();

    return res.user;
});

export const updateUser = createAsyncThunk("user/updateUser",
    async ({name, email, password}: { email: string; password: string; name: string; }) => {
        const res = await updateUserData(name, email, password);

        return res.user;
    }
);

export const requestForgot = createAsyncThunk("user/requestForgot",
    async ({email}: { email: string }) => {
        const res = await forgotRequest(email);

        return res;
    }
);

export const resetPassword = createAsyncThunk("user/resetPassword",
    async ({password, token}: { password: string; token: string }) => {
        const res = await resetRequest(password, token);

        return res;
    }
);

const user = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerUserRequest = true;
                state.registerUserFailed = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerUserRequest = false;
                state.registerUserFailed = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerUserRequest = false;
                state.registerUserFailed = true;
            })
            .addCase(login.pending, (state) => {
                state.loginUserRequest = true;
                state.loginUserFailed = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginUserRequest = false;
                state.loginUserFailed = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.loginUserRequest = false;
                state.loginUserFailed = true;
            })
            .addCase(logout.pending, (state) => {
                state.logoutUserRequest = true;
                state.logoutUserFailed = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutUserRequest = false;
                state.logoutUserFailed = false;
                state.isAuth = false;
                state.user = {name: "", email: ""};
            })
            .addCase(logout.rejected, (state) => {
                state.logoutUserRequest = false;
                state.logoutUserFailed = true;
            })
            .addCase(refreshToken.pending, (state) => {
                state.tokenRequest = true;
                state.tokenFailed = false;
            })
            .addCase(refreshToken.fulfilled, (state) => {
                state.tokenRequest = false;
                state.tokenFailed = false;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.tokenRequest = false;
                state.tokenFailed = true;
            })
            .addCase(getUser.pending, (state) => {
                state.getUserRequest = true;
                state.getUserFailed = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.getUserRequest = false;
                state.getUserFailed = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state) => {
                state.getUserRequest = false;
                state.getUserFailed = true;
            })
            .addCase(updateUser.pending, (state) => {
                state.updateUserRequest = true;
                state.updateUserFailed = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateUserRequest = false;
                state.updateUserFailed = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state) => {
                state.updateUserRequest = false;
                state.updateUserFailed = true;
            })
            .addCase(requestForgot.pending, (state) => {
                state.forgotRequest = true;
                state.forgotRequestFailed = false;
            })
            .addCase(requestForgot.fulfilled, (state) => {
                state.forgotRequest = false;
                state.forgotRequestFailed = false;
            })
            .addCase(requestForgot.rejected, (state) => {
                state.forgotRequest = false;
                state.forgotRequestFailed = true;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resetRequest = true;
                state.resetFailed = false;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resetRequest = false;
                state.resetFailed = false;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.resetRequest = false;
                state.resetFailed = true;
            });
    },
});

export default user.reducer;