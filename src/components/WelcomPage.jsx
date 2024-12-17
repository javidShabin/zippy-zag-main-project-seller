import React from "react";
import {
  chilly1Image,
  chillyImage,
  heroImage,
  mint1Image,
  mintImage,
  tomato1Image,
  tomatoImage,
} from "../assets";
import { Link } from "react-router-dom";

const WelcomPage = () => {
  return (
    <main
      className="w-full h-screen flex flex-col justify-center items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <img
        src={mintImage}
        className="w-[50px] sm:w-[80px] absolute top-10 sm:top-20 right-16 sm:right-56 animate-slideRight"
      />
      <img
        src={tomatoImage}
        className="w-[50px] sm:w-[80px] absolute bottom-5 right-20 sm:right-80 animate-slideRight"
      />
      <img
        src={mint1Image}
        className="w-[70px] sm:w-[120px] absolute bottom-5 left-20 sm:left-80 animate-slideRight"
      />
      <img
        src={tomato1Image}
        className="w-[90px] sm:w-[150px] absolute top-5 sm:top-10 left-14 sm:left-56 animate-slideRight"
      />
      <img
        src={chillyImage}
        className="w-[70px] sm:w-[110px] absolute bottom-20 sm:bottom-60 right-0 animate-slideRight"
      />
      <img
        src={chilly1Image}
        className="w-[90px] sm:w-[150px] absolute bottom-20 sm:bottom-60 left-0 animate-slideRight"
      />
      <div className="flex flex-col justify-center items-center w-full h-full px-4 sm:px-8 lg:px-12">
        {/* Text Section */}
        <div className="text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-black">
            Welcome to Your Admin Portal
          </h1>
          <h2 className="text-[#ffa100] text-2xl sm:text-3xl md:text-5xl lg:text-[70px] font-black mt-4">
            Manage Restaurants
          </h2>
          <p className="text-[#646464] mt-3 text-xs sm:text-sm lg:text-lg">
            www.zippyzag.com
          </p>
          <Link to={"/log-in"}>
            <button className="py-2 sm:py-3 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg shadow-[#ffa100] mt-4 text-xs sm:text-base">
              Join Us
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default WelcomPage;
