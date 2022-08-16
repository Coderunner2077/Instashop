import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

export default function Home({ products, bannerData }) {
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
