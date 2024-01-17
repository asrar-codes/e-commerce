import { Form, Link, redirect } from "react-router-dom";

import { useNavigation } from "react-router-dom";
import LoginBtn from "../components/LoginBtn";
import { LoginInput } from "../components";
import { toast } from "react-toastify";
import { account, db } from "../appWrite/auth";
import { store } from "../store";
import { signUp } from "../features/auth/signUpSlice";
import { ID } from "appwrite";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const { cartProducts, noOfItemsInCart, totalPriceOfCart } = JSON.parse(
    localStorage.getItem("cartDetails")
  );

  try {
    const data = await account.createEmailSession(email, password);
    const user = await account.get();
    user.$id = data.$id;
    store.dispatch(signUp(user));
    const res = await db.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        cartProducts: cartProducts,
        noOfItemsInCart,
        totalPriceOfCart,
      }
    );
    console.log(res);
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
