import React from "react";
import { account } from "../appWrite/auth";
import { setCartProducts } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { logout } from "../features/auth/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = ({ isModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sessionID } = useSelector((state) => state.signUp);
  const handleLogout = async () => {
    console.log(user.$id);
    try {
      await account.deleteSession([`${sessionID}`]);
      dispatch(logout());
      dispatch(
        setCartProducts({
          cartProducts: [],
          noOfItemsInCart: 0,
          totalPriceOfCart: 0,
        })
      );
      toast.success("logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <section
      className={`transition-all duration-300  w-[200px]   ${
        isModalOpen ? " translate-x-0  visible" : "translate-x-full invisible"
      }  p-4 bg-emerald-500 rounded-tr-lg z-50 absolute top-8 right-4 overflow-hidden
      `}
    >
      <div>
        <p className="text-lg">Welcome, {user.name} </p>

        <button onClick={handleLogout}>logout</button>
      </div>
    </section>
  );
};

export default Profile;
