import { createSlice } from "@reduxjs/toolkit";

const items =
    localStorage.getItem("order") !== null ?
    JSON.parse(localStorage.getItem("order")) :
    [];

const initialState = {
    value: items,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.value = [...state.value, action.payload];
            localStorage.setItem("order", JSON.stringify(state.value));
        },
        updateOrder: (state, action) => {
            const myArray = state.value;

            //Find index of specific object using findIndex method.
            const objIndex = myArray.findIndex((obj) => obj.id == action.payload.id);

            //Log object to Console.
            console.log("Before update: ", myArray[objIndex]);

            //Update object's name property.
            myArray[objIndex].status = action.payload.status;

            //Log object to console again.
            console.log("After update: ", myArray[objIndex]);
            localStorage.setItem("order", JSON.stringify(state.value));
        },
    },
});

// Action creators are generated for each case reducer function
export const { addOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;