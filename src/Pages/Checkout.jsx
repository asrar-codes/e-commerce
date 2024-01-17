import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SectionTitle from "../components/SectionTitle";
import { LoginBtn, LoginInput } from "../components";
import CartTotals from "../components/CartTotals";

export const loader = (user) => () => {
  // console.log(user);
  if (!user) {
    toast.warn("You must be logged in to access this page");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const { user, cartProducts, orders, dispatchOrders, getUserCart } =
    useGlobalContext();
  const navigate = useNavigate();
  const getUserOrders = async () => {};

  const handleOrders = async (e) => {};

  if (cartProducts.length < 1) {
    return <SectionTitle text={"You've have no items in cart"} />;
  }
  return (
    <section className="w-11/12 h-screen mx-auto">
      <SectionTitle text="place your order" />
      <h1 className="mt-4 text-xl font-medium">Shipping information</h1>
      <div className="checkoutform grid gap-6 md:grid-cols-2 ">
        <form onSubmit={handleOrders} className="mt-4">
          <div>
            <LoginInput label={"name"} />
          </div>
          <div className="mt-4">
            <LoginInput label={"address"} />
          </div>
          <div
            className="mt-4
          "
          >
            <LoginBtn text="place your order" background={"bg-blue-500"} />
          </div>
        </form>
        <CartTotals />
      </div>
    </section>
  );
};

export default Checkout;
