import React from "react";

const Footer = () => {
  return (
    <section className="w-full mt-6 p-6 text-center bg-slate-700 text-white">
      <h5>
        &copy; {new Date().getFullYear()}
        <span className="font-semibold "> BoxSpace</span>
      </h5>
      <p>All rights reserved</p>
    </section>
  );
};

export default Footer;
