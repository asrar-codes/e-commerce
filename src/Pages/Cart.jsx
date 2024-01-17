import React from "react";
import { CartItem, LoginBtn } from "../components";
import { formatPrice } from "../utils/formatPrice";
import { Link } from "react-router-dom";
import CartTotals from "../components/CartTotals";
import SectionTitle from "../components/SectionTitle";
import { useSelector } from "react-redux";

const Cart = () => {
  // let totalPrice = 0;
  const { user } = useSelector((state) => state.signUp);
  const { cartProducts } = useSelector((state) => state.cart);

  if (cartProducts.length < 1) {
    return <SectionTitle text={"No items in the cart..."} />;
  }
  return (
    <>
      <header>
        <h1 className="font-medium text-2xl capitalize p-4">shopping cart</h1>
        <hr />
      </header>
      <section className="w-11/12 mx-auto grid lg:grid-cols-4 lg:mt-6">
        <div className="lg:col-span-3">
          {cartProducts.map((product, index) => {
            return <CartItem key={product.id} index={index} {...product} />;
          })}
        </div>
        <div>
          <CartTotals />
          <div className=" mt-4 justify-self-end">
            {user ? (
              <Link
                to="/checkout"
                className="p-2 block text-center w-full  bg-violet-500 text-white text-lg capitalize rounded-lg"
              >
                proceed to checkout
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-2 block text-center w-full  bg-violet-500 text-white text-lg capitalize rounded-lg"
              >
                please login
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
