import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SharedLayout,
  Home,
  About,
  Cart,
  Products,
  SingleProduct,
  CheckOut,
  NotFound,
  Login,
  SignUp,
  SinglePageError,
} from "./Pages";
import { loader as fetchFeaturedProductsLoader } from "./Pages/Home";
import { loader as singleProductLoader } from "./Pages/SingleProduct";
import { loader as fetchProductsLoader } from "./Pages/Products";
import { loader as checkoutLoader } from "./Pages/Checkout";
import Orders, { loader as ordersLoader } from "./Pages/Orders";
import { action as createUserAction } from "./Pages/SignUp";
import { action as loginUserAction } from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <NotFound />,
    exact: true,
    children: [
      {
        index: true,
        element: <Home />,
        loader: fetchFeaturedProductsLoader,

        errorElement: <SinglePageError />,
      },
      {
        path: "products",
        element: <Products />,
        loader: fetchProductsLoader,
        errorElement: <SinglePageError />,
      },
      {
        path: "products/:id",
        loader: singleProductLoader,
        element: <SingleProduct />,
        errorElement: <SinglePageError />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <SinglePageError />,
      },
      // {
      //   path: "checkout",
      //   element: <CheckOut />,
      //   loader: checkoutLoader(user),
      //   errorElement: <SinglePageError />,
      // },
      // {
      //   path: "orders",

      //   element: <Orders />,
      //   loader: ordersLoader(user),
      //   errorElement: <SinglePageError />,
      // },

      {
        path: "about",
        element: <About />,
        errorElement: <SinglePageError />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    action: loginUserAction,
    errorElement: <SinglePageError />,
  },
  {
    path: "signup",
    element: <SignUp />,
    action: createUserAction,
    errorElement: <SinglePageError />,
  },
]);

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  return <RouterProvider router={router} />;
}

export default App;
