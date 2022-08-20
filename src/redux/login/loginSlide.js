import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            // localStorage.setItem("user", JSON.stringify(state.value));
        },
        logout: (state) => {
            state = null;
            // localStorage.setItem("user", JSON.stringify(state.value));
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;