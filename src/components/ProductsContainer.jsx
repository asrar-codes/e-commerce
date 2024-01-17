import { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { BsGridFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
const ProductsContainer = () => {
  const { products } = useLoaderData();
  const [grid, setGrid] = useState("grid");

  return (
    <>
      <header className="mt-8 w-11/12 mx-auto  flex justify-between p-6 items-center">
        <h4>
          {products.length} product{products.length > 1 && "s"}
        </h4>
        <div className="btn-container text-2xl flex gap-8">
          <button
            className={`${
              grid === "grid" && "bg-violet-500 text-white rounded-[50%]"
            }  p-2 `}
            onClick={() => setGrid("grid")}
          >
            <BsGridFill />
          </button>

          <button
            className={`${
              grid === "list" && "bg-violet-500 text-white rounded-[50%]"
            } p-2 `}
            onClick={() => setGrid("list")}
          >
            <FaBars />
          </button>
        </div>
      </header>
      <hr className="w-11/12 mx-auto border-slate-500" />
      {grid == "grid" ? <ProductsGrid /> : <ProductsList />}
    </>
  );
};

export default ProductsContainer;
