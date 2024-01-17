import React from "react";

const LoginBtn = ({ text, clickFunction, background, disabled }) => {
  return (
    <button
      onClick={clickFunction}
      className={`w-full ${background} capitalize p-2 border text-white text-lg rounded-md`}
      type="submit"
      disabled={disabled}
    >
      {disabled ? "Loading..." : text}
    </button>
  );
};

export default LoginBtn;
