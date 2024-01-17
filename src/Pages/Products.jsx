import {
  useLoaderData,
  useNavigate,
  useSearchParams,
  createSearchParams,
  Form,
} from "react-router-dom";
import { Filters, ProductsContainer } from "../components";
// import { useGlobalContext } from "../context/context";
// import { BsCheckLg } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { customFetch } from "../utils/customFetch";

export const loader = async ({ request }) => {
  // console.log(request);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // console.log(params);
  // console.log(search);
  const { data } = await customFetch.get(`/products`, { params });
  // console.log(data);

  return {
    products: data.data,
    noOfPages: data.meta.pagination.pageCount,
    companies: data.meta.companies,
    categories: data.meta.categories,
    params,
  };
};

const Products = () => {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const { noOfPages, products, params } = useLoaderData();
  // console.log(noOfPages);
  const [pageIndex, setPageIndex] = useState(parseInt(params.page) || 1);
  const btnArr = Array.from({ length: noOfPages }, (_, i) => i + 1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: `${pageNumber}` });
    setPageIndex(parseInt(params.page));
    // setPageIndex(pageNumber);
  };

  return (
    <div className="w-11/12 mx-auto">
      <Filters />

      {products.length > 0 ? (
        <ProductsContainer />
      ) : (
        <h2 className="text-2xl text-center font-medium">
          No products matched your search...
        </h2>
      )}

      {noOfPages > 1 && (
        <Form className="pagination mt-12 flex justify-center sm:justify-end ">
          <div
            className={`${
              isDarkMode.dark ? "bg-gray-900 text-white" : "bg-slate-100"
            } button-container w-1/5 flex gap-6 text-xl    p-2 rounded-lg`}
          >
            {btnArr.map((btnNo, id) => {
              return (
                <button
                  key={btnNo}
                  onClick={() => handlePageChange(btnNo)}
                  type="button"
                  className={`${
                    pageIndex === btnNo
                      ? "text-red-700 bg-slate-300 rounded p-1"
                      : ""
                  }  p-1 `}
                >
                  {btnNo}
                </button>
              );
            })}
          </div>
        </Form>
      )}
    </div>
  );
};

export default Products;
