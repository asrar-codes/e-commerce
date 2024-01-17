import { useForm, ValidationError } from "@formspree/react";
import Emailvalidation from "@everapi/emailvalidation-js";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [state, handleSubmit] = useForm("xbjvleka");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const emailRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(e);
    console.log(import.meta.env.VITE_EMAILVALIDATION_KEY);
    const client = new Emailvalidation(
      `${import.meta.env.VITE_EMAILVALIDATION_KEY}`
    );

    try {
      const response = await client.info(`${emailRef.current.value}`, {
        catch_all: 0,
      });
      // console.log(response);
      // console.log(state);
      if (response.state === "undeliverable") {
        toast.error("Please stop kidding and provide a valid email adress 😎");
        emailRef.current.focus();
        emailRef.current.value = "";
        setIsEmailValid(false);
        return;
      } else if (response.state === "deliverable") {
        setIsEmailValid(true);
        toast.success("soon you will recieve the promised discount");
        return;
      }
    } catch (error) {
      setIsEmailValid(false);
      toast.error("something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      {!isEmailValid && (
        <section className="w-11/12 mx-auto p-4 ">
          <p className="text-xl font-bold tracking-wide">
            Join our newsletter and get 20% OFF
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            inventore blanditiis neque minus earum nisi quis natus quas
            voluptatem nulla dolor aut facilis, alias
          </p>
          <form
            onSubmit={isEmailValid ? handleSubmit : handleClick}
            className="p-4"
          >
            <div className="display flex flex-wrap justify-center sm:justify-normal gap-4">
              <input
                id="email"
                type="email"
                name="email"
                // className={` ${
                //   isDarkMode.dark
                //     ? "bg-gray-700 text-white"
                //     : "border-slate-600 "
                // }p-1 text-lg  border rounded-md`}
                placeholder="Enter your email"
                autoComplete="current-email"
                ref={emailRef}
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />

              <button
                type="submit"
                disabled={state.submitting}
                className="p-1 text-lg text-white bg-slate-600 rounded-md"
              >
                {state.submitting ? "loading" : "submit"}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Contact;
