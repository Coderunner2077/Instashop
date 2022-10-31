import { cartSlice, alertSlice, modalSlice } from "./reducers";

export const { toggleCart, addToCart, removeFromCart, toggleCartItemQty, emptyCart, setCart } = cartSlice.actions;
export const { addAlert, deleteAlert } = alertSlice.actions;
export const { showModal, hideModal, updateModal } = modalSlice.actions;