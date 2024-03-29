import { Form, Link, redirect } from "react-router-dom";

import { useNavigation } from "react-router-dom";
import LoginBtn from "../components/LoginBtn";
import { LoginInput } from "../components";
import { toast } from "react-toastify";
import { account } from "../appWrite/auth";
import { signUp } from "../features/auth/signUpSlice";
import { getUserCart } from "../appWrite/database";
import { setCartProducts } from "../features/cart/cartSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData);

    try {
      const data = await account.createEmailSession(email, password);
      const user = await account.get();
      store.dispatch(signUp({ user, id: data.$id }));
      const cartData = await getUserCart(`${user.$id}`);
      console.log(cartData);
      const temp = cartData.cartProducts?.map((item) => JSON.parse(item));
      store.dispatch(
        setCartProducts({
          cartProducts: temp,

          totalPriceOfCart: cartData.cartProducts,
          noOfItemsInCart: cartData.noOfItemsInCart,
        })
      );
      toast.success("Logged in successfully!");

      return redirect("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return redirect("/login");
    }
  };

const Login = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <Form
      method="POST"
      className="form w-11/12 max-w-xl mx-auto mt-20 shadow-md shadow-gray-300"
    >
      <div className="form-header text-center"></div>
      <section className="form-container flex flex-col gap-4 border-2 border-gray-300 p-6 rounded-lg ">
        <p className="text-3xl font-semibold text-center">Log in</p>
        <LoginInput label={"email"} />
        <LoginInput label={"password"} />

        <LoginBtn
          text=" Sign In"
          background="bg-violet-500"
          disabled={isLoading}
        />
        {/* <LoginBtn
          text="continue with google (not working yet)"
          clickFunction={signInWithGoogle}
          background="bg-purple-500"
        /> */}
        <div className="already-user">
          <p>Not a memeber yet?</p>
          <Link className="capitalize text-purple-700" to="/signup">
            create account
          </Link>
        </div>
      </section>

      {/* <button onClick={logout} className="btn">
        logout
      </button> */}
    </Form>
  );
};

export default Login;
