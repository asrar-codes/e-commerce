import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SectionTitle from "../components/SectionTitle";
import { LoginBtn, LoginInput } from "../components";
import CartTotals from "../components/CartTotals";
import { useSelector } from "react-redux";
import {
  createOrderDocument,
  getOrdersCollection,
  updateOrdersCollection,
} from "../appWrite/database";
import { setCartProducts } from "../features/cart/cartSlice";

export const loader = (store) => () => {
  const { signUp } = store.getState((state) => state);
  console.log(signUp);
  if (signUp.user == null) {
    toast.warn("You must be logged in to access this page");
    return redirect("/login");
  }

  return null;
};

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    console.log(name, address);
    const data = store.getState((data) => data);
    const { cartProducts, totalPriceOfCart, noOfItemsInCart } = data.cart;
    const { user } = data.signUp;
    try {
      const data = await getOrdersCollection(user.$id);
      if (!data) {
        console.log(data);
        createOrderDocument(user.$id, {
          orderedProducts: cartProducts.map((item) => JSON.stringify(item)),
          name,
        });
        store.dispatch(setCartProducts({ cartProducts: [] }));
      } else {
        const oldOrderedProducts = data.orderedProducts.map((item) =>
          JSON.parse(item)
        );
        cartProducts.forEach((item) => {
          oldOrderedProducts.push(item);
        });

        const newOrderedProducts = oldOrderedProducts.map((item) =>
          JSON.stringify(item)
        );
        await updateOrdersCollection(
          {
            orderedProducts: newOrderedProducts,
          },
          user.$id
        );
        store.dispatch(setCartProducts({ cartProducts: [] }));
      }
    } catch (error) {
      console.log(error);
    }
    return redirect("/orders");
  };

const Checkout = () => {
  const navigation = useNavigate();
  const isLoading = navigation.state === "submitting";
  const { cartProducts } = useSelector((state) => state.cart);

  if (cartProducts.length < 1) {
    return <SectionTitle text={"You've have no items in cart"} />;
  }
  return (
    <section className="w-11/12 h-screen mx-auto">
      <SectionTitle text="place your order" />
      <h1 className="mt-4 text-xl font-medium">Shipping information</h1>
      <div className="checkoutform grid gap-6 md:grid-cols-2 ">
        <Form method="POST" className="mt-4">
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
            <LoginBtn
              text="place your order"
              background={"bg-blue-500"}
              disabled={isLoading}
            />
          </div>
        </Form>
        <CartTotals />
      </div>
    </section>
  );
};

export default Checkout;
