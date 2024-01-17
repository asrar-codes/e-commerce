import React from "react";
import bed from "../assets/bed.svg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="w-11/12  mx-auto mt-8  sm:grid grid-cols-2">
      <header>
        <div className="text">
          <p className="text-4xl font-semibold ">
            We are changing <br /> the way people shop
          </p>
          <p className="text-lg sm:mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link to="/products" className="">
            <button className="p-1 mt-6 text-lg  bg-blue-400 rounded-md">
              Our Products
            </button>
          </Link>
        </div>
      </header>
      <div className="img-container text-center">
        <img src={bed} alt="bed" className="w-10/12" />
      </div>
      <div className="about  col-start-1 col-end-3 ">
        <div className="mt-4 sm:mt-0">
          <p className="text-2xl flex gap-2 sm:text-3xl ">
            We love
            <span className="border p-1 ">BoxSpace</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            quae quam blanditiis vitae, dolor non eveniet ipsum voluptatibus,
            quia optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit
            ad illo sed officiis ea tempore! Similique eos minima sit porro,
            ratione aspernatur! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Accusamus laboriosam placeat molestiae soluta est
            architecto fuga vel ullam similique repellendus non, possimus, modi
            enim esse ipsa. Doloremque dicta dolorum suscipit!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
