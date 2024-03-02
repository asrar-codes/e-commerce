import { Outlet, json, useNavigation } from "react-router-dom";
import { Navbar, Sidebar, Footer, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartTotals } from "../features/cart/cartSlice";
import { updateUserCart } from "../appWrite/database";
import { store } from "../store";
// const products_url = `https://strapi-store-server.onrender.com/api/products?featured=true`;

const SharedLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const dispatch = useDispatch();

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
    const event = window.addEventListener("unload", () => {
      localStorage.removeItem("cartDetails");
    });

    return () => {
      window.removeEventListener("unload", event);
    };
  }, []);

  const { cartProducts } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartTotals(cartProducts));

    const state = store.getState((state) => state);

    if (user != null) {
      console.log("usr is not null");
      updateUserCart(user.$id, {
        cartProducts: state.cart.cartProducts.map((item) =>
          JSON.stringify(item)
        ),
        totalPriceOfCart: state.cart.totalPriceOfCart,
        noOfItemsInCart: state.cart.noOfItemsInCart,
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
