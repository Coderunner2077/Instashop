import Link from 'next/link'
import React from 'react';
import { urlFor } from "../lib/client";

const HeroBanner = ({ bannerData }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="text-xl">{bannerData.smallText}</p>
                <h3 className="text-4xl sm:text-6xl mt-1">{bannerData.midText}</h3>
                <h1 className="text-white lg:text-9xl uppercase md:text-[100px] text-5xl sm:text-[90px] break-words">{bannerData.largeText}</h1>
                <img src={bannerData && bannerData.image ? urlFor(bannerData.image) : ""} alt="headphones" className="absolute pointer-events-none lg:-top-20 md:top-0 top-1/4 lg:right-[2%] md:right-0 right-[5%] hero-img-size" />

                <div>
                    <Link href={`/product/${bannerData.product}`}>
                        <button type="button">{bannerData.buttonText}</button>
                    </Link>
                    <div className="desc right-[10%] bottom-[5%] md:bottom-14">
                        <h5 className="mb-3 font-bold text-base text-end"><span className="lg:p-2 lg:bg-white lg:bg-opacity-60 lg:rounded-3xl">Description</span></h5>
                        <p className="text-black font-thin text-end lg:text-white lg:py-1 lg:pl-1 lg:pr-3 lg:bg-blue-500 lg:bg-opacity-60 lg:rounded-3xl">{bannerData.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner