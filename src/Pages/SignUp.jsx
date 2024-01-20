import LoginBtn from "../components/LoginBtn";
LoginBtn;
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { LoginInput } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { account, db } from "../appWrite/auth";
import { ID } from "appwrite";
import { store } from "../store";
import { signUp } from "../features/auth/signUpSlice";
import { getUserCart } from "../appWrite/database";

// console.log(store.getState((state) => state.cart));
const { cart } = store.getState((state) => state.cart);
const { cartProducts, noOfItemsInCart, totalPriceOfCart } = cart;
// console.log(cartProducts, noOfItemsInCart, totalPriceOfCart);

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { name, email, password } = data;
  try {
    const user = await account.create(ID.unique(), email, password, name);
    const userSession = await account.createEmailSession(email, password);
    console.log(user);
    console.log(user.$id);
    console.log(userSession);
    console.log(userSession.$id);
    console.log(cartProducts);
    const ls = cartProducts.map((item) => JSON.stringify(item));
    console.log(ls);

    const res = await db.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      user.$id,
      {
        cartProducts: cartProducts.map((item) => JSON.stringify(item)),
        noOfItemsInCart,
        totalPriceOfCart,
        name: user.name,
      }
    );
    toast.success("Account created successfully!");
    store.dispatch(signUp({ user, id: userSession.$id }));
    return redirect("/");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    return redirect("/signup");
  }
};

const SignUp = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <Form
      method="POST"
      className="form w-11/12  max-w-xl mx-auto mt-20 shadow-sm shadow-gray-300 border-red-300"
    >
      <div className="form-header text-center"></div>
      <section className="form-container flex flex-col gap-5 border-2 border-gray-300 p-6 rounded-lg ">
        <p className="text-3xl font-semibold text-center">Register</p>
        <LoginInput label={"name"} />
        <LoginInput label={"email"} />
        <LoginInput label={"password"} />

        <LoginBtn
          text="register"
          background="bg-blue-500"
          disabled={isLoading}
        />

        <div className="already-user flex gap-2">
          <p className="capitalize">already a memeber?</p>
          <Link className="capitalize text-purple-700" to="/login">
            sign in
          </Link>
        </div>
      </section>

      {/* <button onClick={logout} className="btn">
        logout
      </button> */}
    </Form>
  );
};

export default SignUp;
