import React, { useEffect, useRef } from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import { useDispatch } from "react-redux";
import { addAlert } from '../store/actions';

export default function Home({ products, bannerData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const timerRef = useRef(null);


  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.cancelled) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        dispatch(addAlert({ type: "success", message: "You can come back to your cart any time" }))
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

  }, [router.isReady]);
  return (
    <>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Most Popular Headphones & Speakers</p>
      </div>

      <div className="products-container">
        {products.map(product => <div key={product._id}><Product product={product} /></div>)}
      </div>

      <FooterBanner bannerData={bannerData.length && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}
