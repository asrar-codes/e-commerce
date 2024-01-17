import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

const ProductsList = () => {
  const { products } = useLoaderData();
  return (
    <section className="w-11/12 mx-auto mt-20 grid gap-8 grid-rows-1 ">
      {products.map((product) => {
        const { attributes } = product;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="single-product mx-auto p-4 grid gap-4 justify-center grid-rows-1 shadow-md  rounded-xl sm:w-full sm:grid-cols-3 "
          >
            <div className="img-container  sm:full">
              <img
                src={attributes.image}
                alt={attributes.title}
                className=" w-[250px]  h-[170px] object-cover rounded-lg"
              />
            </div>
            <div className="desc justify-self-center ">
              <h4 className="text-xl w-max capitalize font-medium ">
                {attributes.title}
              </h4>
              <h4 className="text-lg capitalize text-center sm:text-start  font-semibold text-gray-500 ">
                {attributes.company}
              </h4>
            </div>
            <div className="justify-self-center">
              <p className="text-lg font-medium">
                {formatPrice(attributes.price)}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default ProductsList;
