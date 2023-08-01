import reducer, {
    initialState,
    registerUser,
    login,
    logout,
    getUser,
    updateUser,
    refreshToken,
    requestForgot,
    resetPassword,
} from './user';

const userLoginData: any = {
        name: "name",
        email: "emailname@ya.ru"
};

test("should add a new user", () => {
    expect(
        reducer(initialState, {
            type: registerUser.fulfilled,
            payload: userLoginData,
        })
    ).toEqual({
        ...initialState,
        user: userLoginData,
        isAuth: true,
    });
});

test("should login an existing user", () => {
    expect(
        reducer(initialState, {
            type: login.fulfilled,
            payload: userLoginData,
        })
    ).toEqual({
        ...initialState,
        user: userLoginData,
        isAuth: true
    });
});

test("should logout an existing user", () => {
    expect(
        reducer(initialState, {
            type: logout.fulfilled,
        })
    ).toEqual({
        ...initialState
    });
});

test("should get user info", () => {
    expect(
        reducer(initialState, {
            type: getUser.fulfilled,
            payload: userLoginData,
        })
    ).toEqual({
        ...initialState,
        user: userLoginData,
        isAuth: true,
    });
});

test("should update user info", () => {
    expect(
        reducer(initialState, {
            type: updateUser.fulfilled,
            payload: userLoginData,
        })
    ).toEqual({
        ...initialState,
        user: userLoginData,
        isAuth: true,
    });
});

test("should refresh token", () => {
    expect(
        reducer(initialState, {
            type: refreshToken.fulfilled
        })
    ).toEqual({
        ...initialState
    });
});

test("should recover password for a user", () => {
    expect(
        reducer(initialState, {
            type: requestForgot.fulfilled
        })
    ).toEqual({
        ...initialState
    });
});

test("should reset password", () => {
    expect(
        reducer(initialState, {
            type: resetPassword.fulfilled
        })
    ).toEqual({
        ...initialState
    });
});
