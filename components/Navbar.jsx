import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { CartIcon } from "./UI";
import { IoMdCart } from "react-icons/io";
import { IconContext } from 'react-icons/lib';

import logo from '../assets/easyshop.png';

const Navbar = ({ totalItems }) => {
    const router = useRouter();

    return (
        <div className="bg-inherit w-screen border-b border-black border-opacity-10 navbar">
            <Title title="Instashop" logo={logo} />
            {router.pathname === '/' && (
                <div className="mr-2">
                    <CartIcon to="/cart" icon={<IoMdCart size={40} />} counter={totalItems} />
                </div>
            )}
        </div>
    );
};

const Title = (props) => (
    <h2 className="py-1 px-3 sm:px-3 mr-2 text-lg xs:text-2xl sm:text-3xl group">
        <Link href="/">
            <div className="flex flex-grow items-center">
                <div className="rounded-full bg-gray-100 group-hover:bg-blue-300 transition-all duration-300 flex-x p-0.5 mr-2"><Image src={props.logo} alt="Instashop" height={30} width={30} className="" /></div><span className="text-gray-700">{props.title}</span>
            </div>
        </Link>
    </h2>
);

export default Navbar;