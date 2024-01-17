import React, { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import Select from "./Select";
import LoginBtn from "./LoginBtn";
import { formatPrice } from "../utils/formatPrice";
import { useSelector } from "react-redux";

const Filters = () => {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const { companies, categories, params } = useLoaderData();
  // console.log(companies, categories);
  const [freeShipping, setFreeShipping] = useState(false);
  const sortArr = ["a-z", "z-a", "high", "low"];
  const { search, category, company, sort, price, shipping } = params;
  const maxPrice = 100000;
  const [inputRange, setInputRange] = useState(price || maxPrice);

  const handleSearch = () => {};
  const handleReset = () => {};
  return (
    <section
      className={` ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200"
      } filters mt-8 mx-auto px-6 py-6  rounded-lg `}
    >
      <Form className="input-container w-full grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="search" className="capitalize">
            search product
          </label>
          <input
            type="search"
            name="search"
            className={`${
              isDarkMode && " bg-gray-600 text-white"
            } p-1 border outline-none border-slate-500 rounded-lg`}
            id="search"
            defaultValue={"search"}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label={"select category"}
            name="category"
            options={categories}
            defaultValue={category}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label={"select company"}
            name={"company"}
            options={companies}
            defaultValue={company}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label={"sort by"}
            name={"order"}
            options={sortArr}
            defaultValue={sort}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="file " className="flex capitalize justify-between">
            select price:
            <span className="justify-center">{formatPrice(0)}</span>
          </label>
          <input
            type="range"
            name="price"
            min={0}
            max={100000}
            className={` "cursor-pointer"`}
            step={1000}
            value={0}
            onChange={(e) => setInputRange(parseInt(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="checkbox " className="flex capitalize">
            free shipping
          </label>
          <input
            type="checkbox"
            name="shipping"
            // className={`${
            //   isDarkMode.dark && " text-blue-500 accent-gray-700 "
            // } w-6 h-6 p-1 border outline-none border-slate-500 rounded-lg`}
            defaultChecked={"shipping"}
            id="checkbox"
          />
        </div>
        <div>
          <LoginBtn
            text={"search"}
            clickFunction={handleSearch}
            background={"bg-purple-500"}
          />
        </div>
        <div>
          <LoginBtn
            text={"reset"}
            clickFunction={handleReset}
            background={"bg-violet-500"}
          />
        </div>
      </Form>
    </section>
  );
};

export default Filters;
