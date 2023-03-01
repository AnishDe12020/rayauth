import React from "react";
import Navbar from "../common/Navbar";
import MainLayout from "../layouts/MainLayout";
import About from "./About";
import Hero from "./Hero";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Hero />
      <About />
    </div>
  );
};

export default LandingPage;
