import React from "react";
import Image from "next/image";
type Props = {};

function Hero({}: Props) {
  const check = () => {
    window.top?.postMessage({ type: "txnData", help: "chal jao" }, "*");
  };
  return (
    <div className="relative flex flex-col justify-between w-11/12 max-w-screen-xl mx-auto my-16 lg:flex-row">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] md:left-[650px] top-[158px] md:top-[100px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />
      <div className="flex flex-col items-center justify-center ">
        <div>
          <h1 className="text-[#FCFCFC] font-bold font-ksans text-4xl lg:text-7xl text-center md:text-left">
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
              className="text-center text-gradient from-purple-400 to-pink-500 md:text-left"
            >
              authorization
            </span>
          </h1>
          <p className="text-[#FFFFFFB2] my-6 lg:my-8 font-ksans font-bold lg:font-semibold text-center md:text-left">
            Our sdks and infrastructure helps you to onboard <br /> new
            generation of users
          </p>
          <div className="flex flex-row justify-center my-6 md:justify-start">
            {/* THIS IS JUST FOR TESTING FOR GODSAKE OKAYYYY */}
            <a
              onClick={() => check()}
              href="/login"
              className="px-4 md:px-12 py-0 lg:py-2 mr-4 lg:mr-8 rounded-xl lg:rounded-full text-black bg-white font-bold lg:font-bold text-base lg:text-xl font-ksans hover:bg-transparent border-2 hover:border-2 hover:text-white"
            >
              Get Started
            </a>
            <a
              href="https://docs.rayauth.com/"
              target={"_blank"}
              className="px-3 py-0 ml-4 text-base font-bold text-white border-2 border-solid md:px-8 lg:py-2 lg:ml-8 rounded-xl lg:rounded-full lg:font-bold lg:text-xl font-ksans border-slate-50 hover:bg-white hover:text-black"
              rel="noreferrer"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-8 overflow-hidden lg:my-2">
        <Image
          width={400}
          height={513}
          src="/assets/authcard.png"
          alt={"RayAuth card"}
        />
      </div>
    </div>
  );
}

export default Hero;
