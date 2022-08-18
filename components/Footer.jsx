import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className="text-sky-700 text-center mt-5 py-7 px-2.5 font-bold flex-y gap-2.5 cursor-default">
            <p>{new Date().getFullYear()} &copy; Instashop All rights reserverd</p>
            <p className="text-3xl flex gap-2.5">
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
        </div>
    )
}

export default Footer