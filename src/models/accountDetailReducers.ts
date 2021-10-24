import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:"",
    name: "",
    phone: "",
    address: "",
    joinDate: "",
}
const accountDetailReducers = createSlice({
    name: 'accountDetail',
    initialState:initialState,
    reducers: {
        addAccountDetail(state,action) {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.joinDate = action.payload.joinDate;
        },
        resetAccountDetail(state, action) {
            state._id = initialState._id;
            state.name = initialState.name;
            state.phone = initialState.phone;
            state.address = initialState.address;
            state.joinDate = initialState.joinDate;
        }
    },
})

export const { addAccountDetail, resetAccountDetail } = accountDetailReducers.actions;

export default accountDetailReducers.reducer;