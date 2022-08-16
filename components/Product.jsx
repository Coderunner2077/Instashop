import React from 'react';
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="cursor-pointer scale-100 transition-all duration-500 text-sky-600 hover:scale-110">
                    <img src={urlFor(image && image[0])} width={250} height={250} className="rounded-2xl bg-gray-200 scale-100 transition-all duration-500 drop-shadow" />
                    <p className="font-medium">{name}</p>
                    <p className="font-extrabold mt-1.5 text-black">${price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product