import React, { useState } from 'react';
import { Image } from "next/image";
import { AiOutlineStar, AiOutlinePlus, AiOutlineMinus, AiFillStar } from "react-icons/ai";
import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);

    const onHoverImage = (index) => {
        setIndex(index);
    }

    return (
        <div className="flex justify-around gap-3 w-full h-fit flex-col items-center md:items-start md:flex-row ">
            <div className="md:w-1/2 md:h-2/3 lg:h-1/2 flex flex-col items-center justify-start">
                <div className="w-full h-3/4 flex-x">
                    <img src={urlFor(image && image[index])} className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-contain" />
                </div>
                <div className="w-full h-1/4 flex gap-2 p-5 md:p-6 flex-x">
                    {image?.map((item, i) => (
                        <div className={`${i === index ? "active-img" : "border-transparent"} border w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 relative`}>
                            <img src={urlFor(item)} className={`w-10 h-10 lg:w-20 sm:w-14 sm:h-14 lg:h-20 object-cover rounded-xl ${i == index ? "transition-all duration-300" : "transition-none"}`} onMouseEnter={() => onHoverImage(i)} key={`image-${i}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/3 md:w-[45%] md:h-2/3 lg:h-1/2 flex flex-col gap-3">
                <h1 className="text-sky-900 font-extrabold text-3xl">{name}</h1>
                <div className="space-x-0.5 text-red-600 flex">
                    {[0, 1, 2, 3].map((_, i) => <AiFillStar key={`star-${i}`} />)}
                    <AiOutlineStar />
                    <p className="relative bottom-[5px] text-black">
                        (20)
                    </p>
                </div>

                <h4 className="font-bold text-xs text-black">Details: </h4>
                <p className="font-thin text-xs">{details}</p>
                <p className="font-bold text-red-700 text-3xl mt-2">${price}</p>
                <div className="mt-1 flex items-center gap-6">
                    <h3 className="font-bold text-lg text-gray-800">Quantity:</h3>
                    <p className="border border-gray-800 rounded-3xl flex-x">
                        <span onClick={() => { }} className="flex-x w-10 h-10 border-r border-gray-600 cursor-pointer">
                            <AiOutlineMinus />
                        </span>
                        <span className="flex-x w-10 h-10 border-r border-gray-600 cursor-default">
                            0
                        </span>
                        <span onClick={() => { }} className="flex-x w-10 h-10 cursor-pointer">
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className="flex gap-3 mt-3">
                    <button type="button" className="text-red-600 border-2 border-red-600 drop-shadow bg-white font-bold py-2 px-6 rounded-3xl text-center cursor-pointer hover:scale-110 hover:ring-2 hover:ring-red-300 transition-all duration-200">
                        Add to Cart
                    </button>
                    <button type="button" className="bg-red-600 text-white font-bold py-2 px-6 text-center drop-shadow cursor-pointer rounded-3xl hover:scale-110 hover:ring-2 hover:ring-red-300 transition-all duration-200">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == product] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: "blocking"
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;

    const products = await client.fetch(productsQuery);
    const product = await client.fetch(query);

    return {
        props: { products, product }
    }
}

export default ProductDetails;
