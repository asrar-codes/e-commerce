import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

const FeaturedProducts = () => {
  const { products } = useLoaderData();
  // console.log(products);
  return (
    <section className=" w-11/12 mx-auto mt-4  ">
      <h2 className="text-3xl font-semibold tracking-wide">
        Featured Products
      </h2>
      <hr className="mt-4 bg-slate-500 opacity-100" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 p-3 gap-4  ">
        {products.map((product) => {
          const { title, image, price } = product.attributes;
          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="text-center shadow-md  shadow-gray-300 p-4 rounded-lg "
            >
              <img
                src={image}
                alt={title}
                className="w-72 mx-auto h-40 object-cover rounded-lg"
              />
              <p className="font-semibold text-2xl capitalize mt-3">{title}</p>
              <p className="text-lg">{formatPrice(price)}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
