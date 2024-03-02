import React, { useEffect } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import SectionTitle from "../components/SectionTitle";

import { CartItem } from "../components";
import { formatPrice } from "../utils/formatPrice";
import { getOrdersCollection } from "../appWrite/database";

export const loader = (store) => async () => {
  const { signUp } = store.getState((state) => state);
  console.log(signUp);
  if (signUp.user == null) {
    toast.warn("You must be logged in to access this page");
    return redirect("/");
  }
  const { orderedProducts } = await getOrdersCollection(signUp.user.$id);
  const newOrderedProducts = orderedProducts.map((item) => JSON.parse(item));
  console.log(newOrderedProducts);

  return { orderedProducts: newOrderedProducts };
};

const Orders = () => {
  const data = useLoaderData();
  console.log(data);

  if (!data) {
    return <SectionTitle text="no orders found.." />;
  }
  console.log(data);

  return (
    <section className="">
      <SectionTitle text={"your orders"} />
      <hr />
      {data &&
        data.orderedProducts.map((product, index) => {
          const { image, title, company, price, itemColor } = product;
          return (
            <section
              key={index + 1}
              className="p-4 flex flex-col sm:items-center gap-3 sm:grid sm:grid-cols-4 "
            >
              <div className="img-container">
                <img
                  src={image}
                  alt={title}
                  className=" w-[210px] h-[170px] object-cover rounded-lg "
                />
              </div>
              <div className="title">
                <h1 className="font-medium capitalize text-xl">{title}</h1>
                <p className="company font-medium text-gray-600">{company}</p>
                <span className="flex items-center gap-2 text-lg capitalize">
                  color:
                  <p
                    className="color w-6 h-6 inline-block rounded-[50%]"
                    style={{ backgroundColor: itemColor }}
                  ></p>
                </span>
              </div>
              <div className="price sm:justify-self-end">
                <h4>{formatPrice(price)}</h4>
              </div>
            </section>
          );
        })}
    </section>
  );
};

export default Orders;
