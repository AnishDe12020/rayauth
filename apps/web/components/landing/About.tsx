import Image from "next/image";
import React from "react";

type Props = {};
const card = [
  {
    title: "Secure Network",
    description:
      "Leverage normal web2 login flows but in a truly decentralised manner",
    icon: "/assets/about/gassless.svg",
  },
  {
    title: "Secure Network",
    description:
      "Leverage normal web2 login flows but in a truly decentralised manner",
    icon: "/assets/about/lock.svg",
  },
  {
    title: "Gasless Transactions",
    description:
      "Leverage normal web2 login flows but in a truly decentralised manner",
    icon: "/assets/about/secure.svg",
  },
];
const About = (props: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto w-11/12">
      <div className="flex flex-wrap justify-center items-stretch my-16 lg:my-40">
        {card.map((item, index) => {
          return (
            <div key={index} className="w-full lg:w-1/3 px-4 lg:px-12  mb-12">
              <div className="bg-primary border rounded-3xl border-white text-white overflow-hidden shadow-md">
                <div className="px-8 py-14">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                  <h2 className="text-xl font-bold my-4">{item.title}</h2>
                  <p className=" text-base">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h3
          style={{
            background: "linear-gradient(90deg, #45A0F5 0%, #26E3C2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fill: "transparent",
          }}
          className="font-extrabold  text-4xl lg:text-6xl leading-9 lg:leading-[80px] text-center md:text-left"
        >
          Next gen SDKs for your loved platforms and technologies to help users
          onboard.
        </h3>
        <div className="relative h-[50vh] lg:h-screen my-2 lg:my-16">
          <Image
            className="absolute"
            src={"/assets/about/laptopvw.svg"}
            alt={""}
            fill
          />
          <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />
        </div>
      </div>
      <div className="w-full my-32 relative">
        <div className="w-fit">
          <h3 className="font-ksans text-4xl lg:text-6xl text-white font-bold mb-9 text-center md:text-left">
            Our Key Infrastructure
          </h3>
          <h4 className="text-[#FFFFFFB2] text-base font-medium font-ksans leading-6 w-full lg:w-3/5 text-center md:text-left">
            We have a very secure way of saving your private keys which makes it
            near impossible to be compromised.
          </h4>
          <div className="flex justify-center lg:justify-start">
            <button className="my-8 font-ksans font-extrabold bg-white text-black rounded-full px-6 py-3 text-center md:text-left">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative h-[30vh] lg:h-[50vh] my-2 lg:my-16 mx-auto">
          <Image
            className="absolute w-full"
            src="/assets/about/connecters.svg"
            alt={"Our Key Infrastructure"}
            fill
          />
          <div className="rounded-full overflow-hidden absolute w-[260px] h-[200px] md:w-[483px] lg:h-[200px] left-[25%] top-[0] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default About;
