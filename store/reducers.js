import { createSlice, combineReducers } from "@reduxjs/toolkit";
import http from "../lib/http";
import { client } from "../lib/client";
import { setLocalStorage } from "../utils"

const initialState = {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart: (state, action) => {
            let cartItems = [];
            if (typeof window !== 'undefined' && JSON.parse(localStorage.getItem("insta-cart")) !== null && JSON.parse(localStorage.getItem("insta-cart")) !== undefined) {
                cartItems = JSON.parse(localStorage.getItem("insta-cart"));
                state.cartItems = cartItems;
                state.totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            }
        },
        setCart: (state, action) => {
            const cartItems = action.payload;
            state.cartItems = cartItems;
            state.totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            setLocalStorage(cartItems);
        },
        toggleCart: (state, action) => {
            state.showCart = action.payload;
        },
        addToCart: (state, action) => {
            const { cartItems } = state;
            const { product, quantity } = action.payload;
            state.totalPrice += (product.price * quantity);
            state.totalQuantity += quantity;
            const checkExists = cartItems.find(item => item._id === product._id);
            if (checkExists) {
                state.cartItems = cartItems.map(item => item._id !== product._id ? item : { ...item, quantity: item.quantity + quantity });
                http.put("/api/cart", { productId: product.slug.current, action: "inc", quantity }).then(res => { });
            }
            else {
                state.cartItems = [...cartItems, { ...product, quantity }];
                http.post("/api/cart", { productId: product.slug.current, quantity }).then(res => { });
            }

            setLocalStorage(state.cartItems);
        },
        removeFromCart: (state, action) => {
            const { product } = action.payload;
            const { cartItems } = state;
            const foundProduct = cartItems.find(item => item._id === product._id);
            if (!foundProduct) return;
            state.cartItems = cartItems.filter(item => item._id !== foundProduct._id);
            state.totalPrice -= foundProduct.price * foundProduct.quantity;
            state.totalQuantity -= foundProduct.quantity;
            http.delete(`/api/cart/${product.slug.current}`).then(res => { });

            setLocalStorage(state.cartItems);
        },
        toggleCartItemQty: (state, action) => {
            const { cartItems } = state;
            const { id, value } = action.payload;
            const foundProduct = cartItems.find(item => item._id === id);
            const index = cartItems.findIndex(item => item._id === id);

            if (value === "inc") {
                cartItems.splice(index, 1, { ...foundProduct, quantity: foundProduct.quantity + 1 });
                state.cartItems = cartItems;
                state.totalPrice += foundProduct.price;
                state.totalQuantity += 1;
                http.put("/api/cart", { productId: foundProduct.slug.current, action: "inc", quantity: 1 }).then(res => { });

            } else if (foundProduct.quantity > 1) {
                cartItems.splice(index, 1, { ...foundProduct, quantity: foundProduct.quantity - 1 });
                state.cartItems = cartItems;
                state.totalPrice -= foundProduct.price;
                state.totalQuantity -= 1;
                http.put("/api/cart", { productId: foundProduct.slug.current, action: "decr", quantity: 1 }).then(res => { });

            }
            setLocalStorage(state.cartItems);
        },
        emptyCart: (state, action) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
            if (typeof window !== 'undefined') localStorage.clear();
            if (action.payload === true)
                http.delete("/api/cart").then(res => { });
        }
    }
});

const initialAlertState = {
    alert: null
}

export const alertSlice = createSlice({
    name: "flash",
    initialState: initialAlertState,
    reducers: {
        addAlert: (state, action) => {
            state.alert = action.payload
        },
        deleteAlert: (state) => {
            state.alert = null
        }
    }
});


const initialModalState = {
    modal: null
}

export const modalSlice = createSlice({
    name: "modal",
    initialState: initialModalState,
    reducers: {
        showModal: (state, action) => {
            state.modal = action.payload;
        },
        hideModal: (state) => {
            state.modal = null
        },
        updateTitle: (state, action) => {
            if (state.modal)
                state.modal.title = action.payload.title;
        }
    }
});

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    flash: alertSlice.reducer,
    modal: modalSlice.reducer
});

export default rootReducer;
