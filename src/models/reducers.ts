import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./accountReducers";
import cartReducers from "./cartReducers";

const Reducers = combineReducers({
    accountReducer: accountReducers,
    cartReducer: cartReducers
})

export default Reducers;