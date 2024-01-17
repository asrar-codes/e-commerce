import { useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { useRef, useState } from "react";
import { customFetch } from "../utils/customFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await customFetch.get(`products/${id}`);

  return { product: data.data, id };
};
const SingleProduct = () => {
  const { product, id } = useLoaderData();
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const amountRef = useRef();

  const newProduct = product.attributes;
  const {
    title,
    company,
    description,
    image,
    category,
    price,
    shipping,
    colors,
  } = newProduct;
  const [stateColor, setStateColor] = useState(colors[0]);

  const handleSelect = (col) => {
    setStateColor(col);
    return;
  };

  return (
    <section className="w-11/12 mt-20 mx-auto grid grid-cols-productsGrid">
      <div className="img-container">
        <img src={image} alt={title} className="w-11/12 object-cover h-1/2" />
      </div>
      <div className="desc">
        <p className="font-semibold text-4xl capitalize">{title}</p>
        <p className="font-semibold text-2xl text-gray-500 ">{company}</p>
        <p className="text-2xl">{formatPrice(price)}</p>
        <p className="text-lg">{description}</p>
        <p className="text-2xl mt-10">Colors:</p>
        <div className="colors mt-4  flex gap-4">
          {colors.map((color) => {
            return (
              <button
                type="button"
                key={color}
                className={`w-10 h-10 cursor-pointer rounded-xl ${
                  stateColor == color ? "border-2 border-black" : "border-none"
                }`}
                style={{ backgroundColor: `${color} ` }}
                onClick={() => handleSelect(color)}
              ></button>
            );
          })}
        </div>
        <p className="text-2xl">Amount</p>
        <select
          ref={amountRef}
          className={`${
            isDarkMode ? "bg-gray-700 text-white" : ""
          }amount w-20 border rounded-md`}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button
          onClick={() => {
            const cartProduct = {
              id: id + stateColor,
              title,
              company,
              image,
              category,
              price,

              itemColor: stateColor,
              itemAmount: parseInt(amountRef.current.value),
            };
            dispatch(addToCart(cartProduct));
          }}
          className="p-2 mt-8 block text-2xl text-white  bg-slate-700 capitalize rounded-lg border-slate-700"
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default SingleProduct;
