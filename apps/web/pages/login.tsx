import useAuth from "@/hooks/useAuth";
import { sign } from "crypto";
import { NextPage } from "next";
import Image from "next/image";

const LoginPage: NextPage = () => {
  const { signIn } = useAuth();

  return (
    <div
      style={{
        background:
          "radial-gradient(381px 364px ellipse at 35% 50%, #45A0F540, #26E3C240, #1E1E1E)",
      }}
      className="h-screen bg-primary max-w-screen-2xl mx-auto relative"
    >
      <div className="min-h-screen flex flex-row items-center justify-center ">
        <div className="flex-auto">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col">
              <div className="flex flex-col items-center my-6">
                <Image
                  className="justify-self-center"
                  src="/logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h1 className="text-[#FCFCFC] font-bold font-ksans text-3xl lg:text-5xl">
                  RayAuth
                </h1>
              </div>
            </div>
            <div className="py-6 mb-3">
              <h2 className="text-[#FFFFFF80] font-bold font-ksans text-2xl lg:text-[32px] ">
                Enter the Solana Portal
              </h2>
            </div>
            <div className="w-5/6">
              <button
                type="button"
                className="flex justify-center items-center w-full text-black bg-[#FFFFFFE5] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <span className="px-4">
                  <Image
                    src={"/icon/google.svg"}
                    alt={"google"}
                    height={15}
                    width={15}
                  />
                </span>
                <span> Continue with Google</span>
              </button>
            </div>
            <div className="w-5/6">
              <button
                type="button"
                className="flex justify-center items-center w-full text-white bg-[#5865F2] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <span className="px-4">
                  <Image
                    src={"/icon/discord.svg"}
                    alt={"Discord"}
                    height={15}
                    width={15}
                  />
                </span>
                <span> Continue with Discord</span>
              </button>
            </div>
            <div className="w-5/6">
              <button
                type="button"
                className="flex justify-center items-center w-full text-white bg-[#212121] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <span className="px-4">
                  <Image
                    src={"/icon/github.svg"}
                    alt={"Github"}
                    height={15}
                    width={15}
                  />
                </span>
                <span> Continue with Github</span>
              </button>
            </div>
            <div>
              <span className="text-white">Or use wallet</span>
            </div>
            <div className="flex justify-center items-center w-3/6 my-6">
              <button
                style={{
                  background:
                    "linear-gradient(90deg, #45A0F5 -0.1%, #26E3C2 100.03%)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                className="text-white w-5/6 lg:w-4/6 py-2 px-4 rounded-3xl"
              >
                <span className="flex justify-center">
                  <Image
                    src="/icon/wallet.svg"
                    alt="connect wallet"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="text-sm lg:text-base font-black">
                  Connect Wallet
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-screen overflow-hidden relative hidden lg:block">
          <img
            className="h-full w-full object-cover object-center"
            src="/door.svg"
            alt="door to solana"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
