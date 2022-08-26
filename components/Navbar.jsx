import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { CartIcon } from "./UI";
import { IoMdCart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, setCart } from "../store/actions";
import { Cart } from ".";

import logo from '../assets/easyshop.png';

const Navbar = () => {
    const router = useRouter();
    const { totalQuantity, showCart, cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined' && JSON.parse(localStorage.getItem("insta-cart") !== null))
            dispatch(setCart(JSON.parse(localStorage.getItem("insta-cart"))));
    }, []);

    return (
        <div className="bg-inherit w-screen border-b border-black border-opacity-10 navbar">
            <Title title="Instashop" logo={logo} />

            <div className="mr-2">
                <CartIcon onClick={() => dispatch(toggleCart(true))} icon={<IoMdCart size={40} />} counter={totalQuantity} />
            </div>

            {showCart && <Cart />}
        </div>
    );
};

const Title = (props) => (
    <h2 className="py-1 px-3 sm:px-3 mr-2 text-lg xs:text-2xl sm:text-3xl group">
        <Link href="/">
            <div className="flex flex-grow items-center cursor-pointer">
                <div className="rounded-full bg-gray-100 group-hover:bg-blue-300 transition-all duration-300 flex-x p-0.5 mr-2"><Image src={props.logo} alt="Instashop" height={30} width={30} className="" /></div><span className="text-gray-700 select-none">{props.title}</span>
            </div>
        </Link>
    </h2>
);

export default Navbar;