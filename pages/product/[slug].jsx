import React, { useState, useRef, useMemo, useCallback } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { InView } from "react-intersection-observer";
import { Product } from "../../components";
import { client, urlFor } from "../../lib/client";
import { useDispatch } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { addAlert, addToCart, toggleCart } from "../../store/actions";
import { ReviewScore, ReviewForm, Review } from '../../components/Review';
import prisma from '../../lib/prisma';

const ProductDetails = ({ products, product, reviews: defaultReviews }) => {
    const { data: session } = useSession();
    const [animation, setAnimation] = useState("animate-carousel-right sm:animate-sm-carousel-right md:animate-md-carousel-right lg:animate-lg-carousel-right");
    const { image, name, details, price } = product;
    const [qty, setQty] = useState(1);
    const [index, setIndex] = useState(0);
    const trackRef = useRef(null);
    const scrollDiv = useRef(null);
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState(defaultReviews);
    //const { data: session } = useSession();
    const isReviewed = useMemo(() => {
        if (!session) return false;
        const userReview = reviews.filter(review => review.reviewer.id === session.user.id);
        return userReview.length > 0;
    }, [reviews]);

    const score = useMemo(() => {
        if (!reviews || reviews.length == 0) return 0;
        return (reviews.reduce((sum, review) => review ? sum + review.score : 0, 0) / reviews.length).toFixed(1);
    }, [reviews]);

    const buyNow = () => {
        dispatch(addToCart({ product, quantity: qty }));
        dispatch(toggleCart(true));
        dispatch(addAlert({ type: "success", message: `${qty} ${product.name} added to cart` }));
    }

    const handleAdd = () => {
        dispatch(addAlert({ type: "success", message: `${qty} ${product.name} added to cart` }));
        dispatch(addToCart({ product, quantity: qty }));
    }
    const onHoverImage = (index) => {
        setIndex(index);
    }

    const stopCarousel = useCallback(() => {
        if (!trackRef || !trackRef.current) return;
        trackRef.current.style.animationPlayState = "paused";
    }, [trackRef]);

    const startCarousel = useCallback(() => {
        if (!trackRef || !trackRef.current) return;
        trackRef.current.style.animationPlayState = "running";
    }, [trackRef]);

    const slideRight = () => {
        setAnimation("animate-carousel-right sm:animate-sm-carousel-right md:animate-md-carousel-right lg:animate-lg-carousel-right");
    }

    const slideLeft = () => {
        setAnimation("animate-carousel-left sm:animate-sm-carousel-left md:animate-md-carousel-left lg:animate-lg-carousel-left");
    }

    const onReviewed = (review) => {
        setReviews(reviews => [review, ...reviews]);
    }

    const onDeleted = useCallback(review => {
        setReviews(reviews => reviews.filter(r => r.id !== review.id));
    }, [reviews]);

    const handleScroll = () => {
        scrollDiv.current ? scrollDiv.current.scrollIntoView(true) : null;
    }

    return (
        <>
            <div className="flex justify-around gap-3 w-full h-fit flex-col items-center md:items-start md:flex-row ">
                <div className="md:w-1/2 md:h-2/3 lg:h-1/2 flex flex-col items-center justify-start">
                    <div className="w-full h-3/4 flex-x">
                        <img src={image && image[index] ? urlFor(image[index]) : ""} className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-contain" alt="product" />
                    </div>
                    <div className="w-full h-1/4 flex gap-2 p-5 md:p-6 flex-x">
                        {image?.map((item, i) => (
                            <div key={`thumbnail-${i}`} className={`${i === index ? "active-img" : "border-transparent"} border w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 relative`}>
                                <img src={item ? urlFor(item) : ""} alt="Thumbnail" className={`w-10 h-10 lg:w-20 sm:w-14 sm:h-14 lg:h-20 object-cover rounded-xl border ${i == index ? "transition-all duration-300 border-red-500" : "transition-none border-gray-800"}`} onMouseEnter={() => onHoverImage(i)} key={`image-${i}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/3 md:w-[45%] md:h-2/3 lg:h-1/2 flex flex-col gap-3">
                    <h1 className="text-sky-900 font-extrabold text-3xl">{name}</h1>
                    <div onClick={handleScroll}>
                        <ReviewScore score={score} total={reviews.length} />
                    </div>
                    <h4 className="font-bold text-xs text-black">Details: </h4>
                    <p className="font-thin text-xs">{details}</p>
                    <p className="font-bold text-red-700 text-3xl mt-2">${price}</p>
                    <div className="mt-1 flex items-center gap-6">
                        <h3 className="font-bold text-lg text-gray-800">Quantity:</h3>
                        <p className="border border-gray-800 rounded-3xl flex-x">
                            <span onClick={() => setQty(qty => qty > 1 ? qty - 1 : qty)} className="flex-x w-10 h-10 border-r border-gray-600 cursor-pointer">
                                <AiOutlineMinus />
                            </span>
                            <span className="flex-x w-10 h-10 border-r border-gray-600 cursor-default select-none">
                                {qty}
                            </span>
                            <span onClick={() => setQty(qty => qty + 1)} className="flex-x w-10 h-10 cursor-pointer">
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-3 mt-3">
                        <button type="button" className="btn btn-red-outline" onClick={handleAdd}>
                            Add to Cart
                        </button>
                        <button type="button" className="btn btn-red" onClick={buyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-y gap-10 mt-24">
                <h2 id="carousel-h2" className="text-2xl font-extrabold text-blue-900 w-full text-center">
                    Similar products
                </h2>
                <div className="w-full flex-x gap-2">
                    <div className="carousel-chevron" onMouseEnter={slideLeft}>
                        <BsChevronCompactLeft size="40px" className="relative top-32" />
                    </div>
                    <div className="marquee h-[440px] w-[90%] overflow-x-hidden relative">
                        <div ref={trackRef} id="tracker" className={`absolute track flex justify-center gap-6 mt-5 w-[180%] whitespace-nowrap ${animation}`} onMouseEnter={stopCarousel} onMouseLeave={startCarousel}>
                            {products.map((item, i) => {
                                if (i === 0 || i === (products.length - 1)) return (
                                    <InView key={item._id} as="div" onChange={() => i === 0 ? slideRight() : slideLeft()} trackVisibility={true} delay={100} threshold={0.9} initialInView={i == 0}>
                                        <Product product={item} id={`product-${i}`} />
                                    </InView>
                                )
                                return (
                                    <Product key={item._id} product={item} />
                                )
                            })}
                        </div>
                    </div>
                    <div className="carousel-chevron" onMouseEnter={slideRight} >
                        <BsChevronCompactRight size="40px" className="relative top-32" />
                    </div>
                </div>

            </div>
            <div className="flex-y mt-24 pl-5 sm:pl-10" id="reviews" ref={scrollDiv}>
                <h2 className="text-2xl font-extrabold text-blue-900 w-full text-center mb-10">
                    Reviews
                </h2>
                {!session && (
                    <h3 className="text-lg text-blue-800 font-bold">
                        <span className="cursor-pointer bg-blue-800 hover:bg-blue-900 px-2 py-1 rounded-full text-white" onClick={() => signIn()}>Sign in</span> to leave a review
                    </h3>
                )}
                {session && !isReviewed && (
                    <ReviewForm product={product} onSent={onReviewed} />
                )}
                <div className={`flex flex-col gap-5 w-full ${session && !isReviewed ? "mt-6" : ""}`}>
                    {(!reviews || reviews.length === 0) && (
                        <h3 className="text-sky-700 text-xl mt-6">No reviews yet</h3>
                    )}
                    {reviews && reviews.length > 0 && reviews.map(review => (
                        <Review review={review} onDeleted={onDeleted} key={`review-key-${review.id}`} />
                    ))}
                </div>
            </div>
        </>
    )
}

/*
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
*/

export const getServerSideProps = async ({ params: { slug }, req, res }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product" && slug.current != '${slug}']`;

    const products = await client.fetch(productsQuery);
    const product = await client.fetch(query);
    const reviews = await prisma.review.findMany({
        where: { productId: product._id },
        include: {
            reviewer: {
                select: { id: true, name: true, image: true }
            }
        }
    });
    const session = await unstable_getServerSession(req, res, authOptions);

    return {
        props: {
            session, products, product, reviews: JSON.parse(JSON.stringify(reviews))
        }
    }
}

export default ProductDetails;