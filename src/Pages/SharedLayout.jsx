import { Outlet, json, useNavigation } from "react-router-dom";
import { Navbar, Sidebar, Footer, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartTotals } from "../features/cart/cartSlice";
import { updateUserCart } from "../appWrite/database";
const products_url = `https://strapi-store-server.onrender.com/api/products?featured=true`;

let noOfPages;

const SharedLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const dispatch = useDispatch();
  const { cartProducts, totalPriceOfCart, noOfItemsInCart } = useSelector(
    (state) => state.cart
  );
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const { user } = useSelector((state) => state.signUp);

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
    // const data = JSON.parse(localStorage.getItem("cartDetails"));
    // console.log(data);
    dispatch(getCartTotals(cartProducts));
    // console.log(cartProducts);
    if (user != null) {
      console.log("usr is not null");
      updateUserCart(user.$id, {
        cartProducts: cartProducts.map((item) => JSON.stringify(item)),
        totalPriceOfCart,
        noOfItemsInCart,
        name: user.name,
      });
    }
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
