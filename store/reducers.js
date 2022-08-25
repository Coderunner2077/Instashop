import { createSlice, combineReducers } from "@reduxjs/toolkit";

const initialState = {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0,
    onAdd: () => { }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state, action) => {
            state.showCart = action.payload;
        },
        addToCart: (state, action) => {
            const { cartItems, onAdd } = state;
            const { product, quantity } = action.payload;
            state.totalPrice += (product.price * quantity);
            state.totalQuantity += quantity;
            const checkExists = cartItems.find(item => item._id === product._id);
            if (checkExists)
                state.cartItems = cartItems.map(item => item._id !== product._id ? item : { ...item, quantity: item.quantity + quantity });
            else
                state.cartItems = [...cartItems, { ...product, quantity }];
            onAdd();
        },
        removeFromCart: (state, action) => {
            const { product } = action.payload;
            const { cartItems } = state;
            const foundProduct = cartItems.find(item => item._id === product._id);
            if (!foundProduct) return;
            state.cartItems = cartItems.filter(item => item._id !== foundProduct._id);
            state.totalPrice -= foundProduct.price * foundProduct.quantity;
            state.totalQuantity -= foundProduct.quantity;
        },
        toggleCartItemQty: (state, action) => {
            const { cartItems } = state;
            const { id, value } = action.payload;
            const foundProduct = cartItems.find(item => item._id === id);
            const filteredItems = cartItems.filter(item => item._id !== id);

            if (value === "inc") {
                state.cartItems = [...filteredItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }];
                state.totalPrice += foundProduct.price;
                state.totalQuantity += 1;
            } else if (foundProduct.quantity > 1) {
                state.cartItems = [...filteredItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }];
                state.totalPrice -= foundProduct.price;
                state.totalQuantity -= 1;
            }
        },
        emptyCart: (state) => {
            state = initialState;
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

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    flash: alertSlice.reducer
});

export default rootReducer;
