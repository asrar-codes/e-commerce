import { useRef } from "react";
import { useSelector } from "react-redux";

const Select = ({ label, name, options, defaultValue }) => {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  return (
    <>
      <label htmlFor={name} className="capitalize">
        {label}
      </label>

      <select
        className={`${
          isDarkMode && " bg-gray-600 text-white"
        } border p-1  outline-none cursor-pointer  border-slate-500 rounded-lg`}
        name={name}
        defaultValue={defaultValue}
        id={name}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
