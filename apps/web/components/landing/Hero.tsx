import React from "react";
import Image from "next/image";
type Props = {};
import authcard from "../../public/assets/authcard.svg";
function Hero({}: Props) {
  return (
    <div className="my-16 flex flex-col lg:flex-row justify-between max-w-screen-2xl mx-auto w-11/12">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />
      <div className="flex flex-col items-center justify-center ">
        <div>
          <h1 className="text-[#FCFCFC] font-bold font-ksans text-5xl lg:text-8xl text-center md:text-left">
            Streamline user
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #45A0F5 0%, #26E3C2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fill: "transparent",
              }}
              className="text-gradient from-purple-400 to-pink-500 text-center md:text-left"
            >
              authorization
            </span>
          </h1>
          <p className="text-[#FFFFFFB2] my-6 lg:my-8 font-ksans font-bold lg:font-semibold text-center md:text-left">
            Our sdks and infrastructure helps you to onboard <br /> new
            generation of users
          </p>
          <div className="flex flex-row my-6 justify-center md:justify-start">
            <button className="px-4 md:px-12 py-0 lg:py-2 mr-4 lg:mr-8 rounded-xl lg:rounded-full text-black bg-white font-bold lg:font-black text-lg lg:text-2xl font-ksans">
              Get Started
            </button>
            <button className="px-3 md:px-8 py-0 lg:py-2 ml-4 lg:ml-8 rounded-xl  lg:rounded-full text-white border-solid border-2 font-bold lg:font-black text-lg lg:text-2xl font-ksans border-slate-50 ">
              Documentation
            </button>
          </div>
        </div>
      </div>
      <div className="my-8 lg:my-2 overflow-hidden flex flex-col justify-center items-center">
        <Image
          width={400}
          height={513}
          src="/assets/authcard.svg"
          alt={"RayAuth card"}
        />
      </div>
    </div>
  );
}

export default Hero;
