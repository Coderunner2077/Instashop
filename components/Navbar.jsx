import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { CartIcon, LoginIcon, NavbarProfile } from "./UI";
import { IoMdCart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, setCart, updateCart } from "../store/actions";
import { Cart } from ".";
import http from "../lib/http";
import { client } from "../lib/client";

import logo from '../assets/easyshop.png';
import { setLocalStorage } from '../utils';
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const router = useRouter();
    const { totalQuantity, showCart, cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const timerRef = useRef();
    const { data: session } = useSession();
    const user = useMemo(() => session && session.user, [session]);

    useEffect(() => {
        if (session && typeof window !== 'undefined' && (JSON.parse(localStorage.getItem("insta-cart")) === undefined || JSON.parse(localStorage.getItem("insta-cart")) === null || JSON.parse(localStorage.getItem("insta-cart")).length < 1))
            http.get("/api/cart")
                .then(async ({ data }) => {
                    console.log("data: ", data);
                    if (!data || data.length < 1) return setLocalStorage([]);
                    const query = `*[_type == "product" && slug.current in $slugs]`;
                    let items = await client.fetch(query, { slugs: data.map(cartItem => cartItem.productId) })
                    items = items.map(item => ({ ...item, quantity: data.find(cartItem => cartItem.productId === item.slug.current).quantity }));
                    console.log("items: ", items);
                    dispatch(setCart(items));
                })
        else
            dispatch(updateCart());
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <div className="bg-inherit w-full border-b border-black border-opacity-10 navbar">
            <Title title="Instashop" logo={logo} />

            <div className="mr-2 flex-x gap-2">
                {!!user ? <NavbarProfile /> : <LoginIcon />}
                <CartIcon onClick={() => dispatch(toggleCart(true))} icon={<IoMdCart size={40} />} counter={totalQuantity} />
            </div>

            {showCart && <Cart />}
        </div>
    );
};

const Title = (props) => (
    <h2 className="py-1 px-1 sm:px-3 mr-2 text-lg sm:text-3xl group">
        <Link href="/">
            <div className="flex flex-grow items-center cursor-pointer">
                <div className="rounded-full bg-gray-100 group-hover:bg-blue-300 transition-all duration-300 p-0.5 mr-0.5 sm:mr-2 flex-x"><Image src={props.logo} alt="Instashop" height={30} width={30} className="min-w-10" /></div><span className="text-gray-700 select-none">{props.title}</span>
            </div>
        </Link>
    </h2>
);

export default Navbar;