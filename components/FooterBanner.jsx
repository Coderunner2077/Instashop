import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FooterBanner = ({ bannerData: { discount, largeText,
    saleTime, smallText, midText, desc, product,
    buttonText, image } }) => {
    return (
        <div className="footer-banner-container">
            <div className="flex justify-between h-full items-center">
                <div className="left self-end md:self-start lg:self-center">
                    <p className="sm:ml-[18px]">{discount}</p>
                    <h3 className="font-black md:text-6xl md:ml-6 text-2xl sm:ml-4 md:my-6 my-1">Summer Sales</h3>
                    <p className="sm:ml-[18px]">{saleTime}</p>
                </div>
                <div className="leading-snug text-right md:text-left lg:text-right md:self-end lg:self-center md:justify-self-start">
                    <p className="text-lg">{smallText}</p>
                    <h3 className="font-extrabold text-2xl md:text-5xl">{largeText}</h3>
                    <p className="sm:text-lg md:w-96">{desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type="button" className="rounded-2xl py-2.5 px-4 bg-white text-red-700 border-none mt-10 md:mt-4 text-lg font-medium cursor-pointer">{buttonText}</button>
                    </Link>
                </div>

                <img
                    src={urlFor(image)} className="absolute pointer-events-none -top-8 sm:-top-16 left-0 md:-top-20 md:left-1/2 lg:-top-8 lg:left-[30%] lg:h-auto lg:w-[600px] md:h-96 md:w-96 sm:w-64 sm:h-64 w-56 h-56"
                />
            </div>
        </div>
    )
}

export default FooterBanner