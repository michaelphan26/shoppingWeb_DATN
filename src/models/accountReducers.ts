import { createSlice } from "@reduxjs/toolkit";

const accountReducers = createSlice({
    name: 'account',
    reducers: {
        
    },
    initialState: {
        _id:"",
        email: "",
        id_userInfo: "",
        id_role: "",
        role_name:""
    }
})

export default accountReducers;