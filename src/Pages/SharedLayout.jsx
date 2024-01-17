import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Sidebar, Footer, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartTotals } from "../features/cart/cartSlice";
const products_url = `https://strapi-store-server.onrender.com/api/products?featured=true`;

let noOfPages;

const SharedLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);
  const { isDarkMode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark:bg-slate-800", "text-white");
      localStorage.setItem("theme", JSON.stringify({ dark: true }));
      return;
    } else {
      document.documentElement.classList.remove(
        "dark:bg-slate-800",
        "text-white"
      );
      localStorage.setItem("theme", JSON.stringify({ dark: false }));
      return;
    }
  }, [isDarkMode]);

  useEffect(() => {
    dispatch(getCartTotals(cartProducts));
  }, [cartProducts]);

  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      {isPageLoading ? <Loading /> : <Outlet />}

      <Footer />
    </>
  );
};

export default SharedLayout;
