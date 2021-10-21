import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../common/util/common";

const cartReducers = createSlice({
    name: 'cart',
    reducers: {
        addToCart(state, action) {
            const addItem = action.payload.cartItem
            const existedItem=state.productList.find((cartItem: CartItem) => cartItem.id_product === addItem.id_product)
            if (existedItem=== undefined) {
                state.productList.push(addItem);
                state.total=state.total+(addItem.price - (addItem.price*addItem.discount/100))
            }
            else {
                existedItem.quantity = existedItem.quantity + 1
                state.total=state.total+(addItem.price - (addItem.price*addItem.discount/100))
            }
        },
        changeQuantity(state, action) {
            const cartItem = action.payload.item;
            const newQuantity = action.payload.newQuantity;
            for (const index in state.productList) {
                if (state.productList[index].id_product === cartItem.id_product) {
                    if (parseInt(state.productList[index].quantity) > parseInt(newQuantity)) {
                        const change = parseInt(state.productList[index].quantity) - parseInt(newQuantity);
                        const totalChange = change * (parseInt(state.productList[index].price) - (parseInt(state.productList[index].price) * parseInt(state.productList[index].discount)/100));
                        state.total = state.total - totalChange;
                        state.productList[index].quantity = newQuantity;

                        if (state.productList[index].quantity === 0) {
                            state.productList.splice(index,1)
                        }
                    }
                    else if (parseInt(state.productList[index].quantity) < parseInt(newQuantity)) {
                        const change = parseInt(newQuantity) - parseInt(state.productList[index].quantity);
                        const totalChange = change *( parseInt(state.productList[index].price)- (parseInt(state.productList[index].price)*parseInt(state.productList[index].discount)/100));
                        state.total = state.total + totalChange;
                        state.productList[index].quantity = newQuantity;
                    }
                }
            }
        },
        removeFromCart(state, action) {
          state.productList=state.productList.filter((item:CartItem)=>item.id_product!==action.payload.id_product)
            state.total = state.total - (parseInt(action.payload.quantity) *
                (parseInt(action.payload.price) - parseInt(action.payload.price) * parseInt(action.payload.discount) / 100))  
        },
        resetCart(state) {
            state.total = 0;
            state.productList = [] as any;
        }
    },
    initialState: {
        productList: [] as any,
        total:0
    },

})

export const { addToCart, resetCart,changeQuantity, removeFromCart } = cartReducers.actions;
export default cartReducers.reducer;