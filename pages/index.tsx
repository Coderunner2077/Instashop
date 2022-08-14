import React from "react";

export default function Home() {
  return (
    <>
      HeroBanner

      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {['Product 1', "Product 2"].map(product => <span>{product}</span>)}
      </div>

      Footer
    </>
  )
}
