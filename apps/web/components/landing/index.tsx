import React from "react";
import Navbar from "../common/Navbar";
import About from "./About";
import Hero from "./Hero";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto">
        <Navbar />
        <Hero />
        <About />
      </div>
      <div
        style={{
          background: "linear-gradient(90deg, #45A0F5 0%, #26E3C2 100%)",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fill: "transparent",
        }}
        className="h-2 bg-white"
      ></div>
    </div>
  );
};

export default LandingPage;
