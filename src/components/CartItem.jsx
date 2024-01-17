import React, { useState } from "react";
import { formatPrice } from "../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { cartAmountChange, removeCartItem } from "../features/cart/cartSlice";

const CartItem = ({
  id,
  title,
  company,
  price,
  image,
  itemAmount,
  itemColor,
  index,
}) => {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const { cartProducts } = useSelector((state) => state.cart);
  const [amount, setAmount] = useState(itemAmount);
  const dispatch = useDispatch();

  const options = [1, 2, 3, 4, 5];

  return (
    <>
      <section className="p-4 flex flex-col sm:items-center gap-3 sm:grid sm:grid-cols-4 ">
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
        <div className="amount flex flex-col gap-2">
          <>
            <label htmlFor={"cart"} className="capitalize">
              {"Amount"}
            </label>

            <select
              className={`${
                isDarkMode && " bg-gray-700 text-white"
              } border p-1  outline-none cursor-pointer  border-slate-500 rounded-lg`}
              name={"name"}
              value={amount}
              onChange={(e) => {
                setAmount(() => e.target.value);
                dispatch(
                  cartAmountChange({ id, newAmount: parseInt(e.target.value) })
                );
              }}
              id={"name"}
            >
              {options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </>
          <button
            className="remove w-[20%]"
            onClick={() => dispatch(removeCartItem({ id }))}
          >
            remove
          </button>
        </div>
        <div className="price sm:justify-self-end">
          <h4>{formatPrice(price)}</h4>
        </div>
      </section>
      <hr
        className={`${
          cartProducts.length - 1 == index && "hidden"
        } w-full lg:w-[96%] mx-auto `}
      />
    </>
  );
};

export default CartItem;
