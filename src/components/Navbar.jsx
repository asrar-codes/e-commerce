import { FaBars, FaMoon, FaShoppingCart, FaSun } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { navLinks } from "../utils/NavLinks";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../features/dakmode/darkModeSlice";
import { account } from "../appWrite/auth";
import { logout, signUp } from "../features/auth/signUpSlice";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/formatPrice";
import { setCartProducts } from "../features/cart/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const { user, sessionID } = useSelector((state) => state.signUp);
  const { noOfItemsInCart } = useSelector((state) => state.cart);

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
    <>
      <nav className="flex justify-between items-center py-3 relative text-2xl sm:text-lg text-white bg-slate-700 sm:py-2 ">
        <button
          className="block p-1 rounded-lg sm:hidden"
          onClick={() => console.log("toggleSidebar")}
        >
          <FaBars className="" />
        </button>
        <p className="hidden sm:block text-4xl border p-1 ml-4">BoxSpace</p>
        <ul className="hidden sm:flex nav-links w-10/12  justify-center gap-4 mx-4 capitalize children:cursor-pointer ">
          {navLinks.map((link) => {
            const { id, url, text } = link;
            if (!user && (url === "checkout" || url === "orders")) return;
            return (
              <li key={id}>
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                  end
                >
                  {text}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex utils w-max items-center gap-6 lg:gap-8 mr-4 ">
          <Link to="/cart" className="cursor-pointer flex relative ">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute left-6 bottom-4 text-lg bg-violet-500 w-max h-min px-1 text-center rounded-[40%]">
              {noOfItemsInCart}
            </span>
          </Link>
          <button
            type="button"
            className="darkmode cursor-pointer text-xl"
            onClick={() => dispatch(toggleDarkMode())}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          {user ? (
            <>
              <p>Welcome, {user.name} </p>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <>
              {" "}
              <Link to="login" className="">
                Login
              </Link>
              <Link to="signup" className="w-max ">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
