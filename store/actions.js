import { cartSlice, alertSlice } from "./reducers";

export const { toggleCart, addToCart, removeFromCart, toggleCartItemQty, emptyCart } = cartSlice.actions;
export const { addAlert, deleteAlert } = alertSlice.actions;