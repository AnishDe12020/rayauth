import React from "react";
import Navbar from "../common/Navbar";
import MainLayout from "../layouts/MainLayout";
import About from "./About";
import Hero from "./Hero";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <Hero />
      <About />
    </div>
  );
};

export default LandingPage;
