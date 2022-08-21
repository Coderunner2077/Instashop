import React from 'react';
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="cursor-pointer scale-100 transition-all duration-500 text-sky-600 hover:scale-110 mb-8 hover:mb-0 min-w-[18rem]">
                    <img src={urlFor(image && image[0])} width={250} height={250} className="rounded-2xl mx-auto scale-100 transition-all duration-500 w-72 h-72 object-cover hover:object-contain hover:h-80 border border-gray-300 hover:border-gray-500" />
                    <p className="font-medium text-center">{name}</p>
                    <p className="font-extrabold mt-1.5 text-black text-center">${price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product