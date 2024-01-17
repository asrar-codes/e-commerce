import React from "react";

const SectionTitle = ({ text }) => {
  return (
    <section className="w-11/12 mx-auto mt-6">
      <h1 className="text-2xl capitalize font-medium">{text}</h1>
      <hr className="mt-4" />
    </section>
  );
};

export default SectionTitle;
