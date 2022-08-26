import React from 'react';
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className="text-sky-700 text-center mt-5 py-7 px-2.5 font-bold flex-y gap-2.5 cursor-default">
            <p>{new Date().getFullYear()} &copy; Instashop All rights reserverd</p>
            <p className="text-3xl flex gap-2.5">
                <a href="https://github.com/Coderunner2077/Instashop" target="_blank"><AiOutlineGithub /></a>
                <a href="https://twitter.com/coderunner2077" target="_blank"><AiOutlineTwitter /></a>
            </p>
        </div>
    )
}

export default Footer