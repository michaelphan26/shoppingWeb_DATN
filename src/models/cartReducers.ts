import { createSlice } from "@reduxjs/toolkit";

const cartReducers = createSlice({
    name: 'cart',
    reducers: {
        
    },
    initialState: {
        productList: [] as any,
        total:0
    },

})

export default cartReducers;