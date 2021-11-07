import { combineReducers } from "@reduxjs/toolkit";
import accountDetailReducers from "./accountDetailReducers";
import accountReducers from "./accountReducers";
import cartReducers from "./cartReducers";

const Reducers = combineReducers({
    accountReducer: accountReducers,
    cartReducer: cartReducers,
    accountDetailReducer: accountDetailReducers,
})

export default Reducers;