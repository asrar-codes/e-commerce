import React from "react";
import { useSelector } from "react-redux";

const LoginInput = ({ label }) => {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  return (
    <label
      htmlFor="{label}"
      className="flex flex-col gap-1 capitalize"
      aria-required
    >
      {label}
      <input
        type={label}
        name={label}
        id={label}
        className={` ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
        } p-1  border   outline-none rounded-md`}
        autoComplete={`current-${label}`}
        required
      />
    </label>
  );
};

export default LoginInput;
