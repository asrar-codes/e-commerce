import LoginBtn from "../components/LoginBtn";
LoginBtn;
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { LoginInput } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { account } from "../appWrite/auth";
import { ID } from "appwrite";
import { store } from "../store";
import { signUp } from "../features/auth/signUpSlice";

export let LOGINDATA;
// console.log(store);
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  const { name, email, password } = data;
  // console.log("65a24cbcbbfb7836a62d");
  try {
    const user = await account.create(ID.unique(), email, password, name);
    // console.log(user);
    await account.createEmailSession(email, password);
    // console.log(await account.get());
    toast.success("Account created successfully!");
    store.dispatch(signUp(user));
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
