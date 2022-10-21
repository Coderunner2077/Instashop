import React, { useEffect } from 'react';
import Link from 'next/link';
import { TiDeleteOutline } from 'react-icons/ti';
import { AiOutlineShopping, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { addAlert, toggleCart, toggleCartItemQty, removeFromCart, emptyCart } from "../store/actions";
import { useSession } from "next-auth/react";

import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
    const { totalPrice, totalQuantity, cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const session = useSession();

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems }),
        });

        if (response.statusCode === 500) return dispatch(addAlert({ type: "error", message: "Sorry, there's been an error with Stripe" }))

        const data = await response.json();

        dispatch(addAlert({ type: "warning", message: "Redirection to Stripe..." }));

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    const onBgClick = (e) => {
        e.stopPropagation();
        if (e.target.id !== "cart-container") return;
        dispatch(toggleCart(false))
    }

    const handleEmpty = () => {
        dispatch(addAlert({ type: "success", message: `Cart has been successfully emptied ` }));
        dispatch(emptyCart())
    }

    return (
        <div id="cart-container" className="w-screen bg-black bg-opacity-50 fixed right-0 top-0 z-100 will-change-transform transition-all duration-1000 ease-in-out" onClick={onBgClick}>
            <div className="w-full sm:w-[420px] py-1 px-2 md:w-[600px] md:px-5 md:py-2.5 h-screen bg-white float-right relative ">
                <div className="flex gap-2 items-center">
                    <button
                        type="button"
                        className="flex items-center text-lg font-medium cursor-pointer gap-0.5 ml-4 border-none bg-transparent"
                        onClick={() => dispatch(toggleCart(false))}>
                        <AiOutlineLeft />
                        <span className="mx-2.5">Your Cart</span>
                        <span className="text-red-600">({totalQuantity} items)</span>
                    </button>
                    {totalQuantity > 0 && (
                        <button className={`relative mx-1 p-2 group rounded-full hover:scale-110 transition-all btn-red-outline font-semidold`} onClick={handleEmpty}>
                            <AiOutlineDelete size={18} />
                            <div className={`popup hidden sm:inline-block scale-0 left-10 group-hover:scale-100 -top-2`}>Empty Cart</div>
                        </button>
                    )}
                </div>


                {cartItems.length < 1 && (
                    <div className="m-10 flex-y">
                        <AiOutlineShopping size={150} />
                        <h3 className="font-semibold text-xl">Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => dispatch(toggleCart(false))}
                                className="btn btn-red max-w-[400px] mt-2.5 mb-10"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="mt-2.5 md:mt-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-w-2 scrollbar-thumb-blue-800 scrollbar-track-blue-200 max-h-[70vh] py-5 px-2.5">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="flex gap-2 md:p-3 py-5 px-1.5" key={item._id}>
                            <img src={urlFor(item?.image[0])} className="w-1/4 h-1/4 md:w-[150px] md:h-[150px] md:min-w-[150px] object-contain rounded-2xl" />
                            <div className="pl-2">
                                <div className="item-desc-flex flex-wrap gap-2.5">
                                    <h5 className="whitespace-normal">{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="item-desc-flex mt-7 md:mt-14">
                                    <div>
                                        <p className="border border-gray-800 rounded-3xl flex-x">
                                            <span onClick={() => dispatch(toggleCartItemQty({ id: item._id, value: 'dec' }))} className="flex-x w-10 h-10 border-r border-gray-600 cursor-pointer">
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="flex-x w-10 h-10 border-r border-gray-600 cursor-default">
                                                {item.quantity}
                                            </span>
                                            <span onClick={() => dispatch(toggleCartItemQty({ id: item._id, value: 'inc' }))} className="flex-x w-10 h-10 cursor-pointer">
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-2xl text-red-600 bg-transparent border-none cursor-pointer"
                                        onClick={() => dispatch(removeFromCart({ product: item }))}
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="p-7 md:px-16 absolute bottom-3 right-1.5 w-full">
                        <div className="flex justify-between">
                            <h3 className="text-xl my-2">Subtotal:</h3>
                            <h3 className="text-xl">${totalPrice.toFixed(2)}</h3>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn btn-red" onClick={handleCheckout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart