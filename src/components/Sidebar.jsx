import { NavLink } from "react-router-dom";
import { navLinks } from "../utils/NavLinks";

const Sidebar = () => {
  const show__sidebar =
    "w-1/2 fixed top-10 top-0 right-0 left-0 bg-black transition-all bg-opacity-70 text-white backdrop-blur-sm rounded-md z-50";
  const hide__sidebar = "hidden";

  return (
    <>
      <section
      // className={`${isSidebarOpen ? `${show__sidebar}` : `${hide__sidebar}`}`}
      >
        <ul
          className="flex   flex-col nav-links w-10/12  justify-center gap-2 mx-2 capitalize children:cursor-pointer "
          onClick={() => console.log("hide sidebar")}
        >
          {navLinks.map((link) => {
            return (
              <li key={link.id}>
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                  end
                >
                  {link.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
