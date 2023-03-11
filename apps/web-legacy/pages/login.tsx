import useAuth from "@/hooks/useAuth";
import { sign } from "crypto";
import { NextPage } from "next";
import Image from "next/image";

const LoginPage: NextPage = () => {
  const { signIn } = useAuth();

  return (
    <div className="h-screen mx-auto bg-primary max-w-screen-2xl -z-20">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />
      <div className="z-10 flex flex-row items-center justify-center min-h-screen">
        <div className="flex-auto">
          <div className="flex flex-col items-center justify-center min-h-screen">
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
            <div className="flex flex-col w-5/6 space-y-4">
              <div>
                <button
                  className="flex justify-center items-center w-full text-black bg-[#FFFFFFE5] focus:outline-none focus-visible::ring-4 focus-visible:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-80 transition duration-150"
                  onClick={() => signIn("google")}
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
              <div>
                <button className="flex justify-center items-center w-full text-white bg-[#5865F2] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-80 transition duration-150">
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
              <div>
                <button className="flex justify-center items-center w-full text-white bg-[#212121] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-80 transition duration-150">
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
            </div>
          </div>
        </div>
        <div className="relative hidden w-2/3 h-screen overflow-hidden lg:block">
          <img
            className="object-cover object-center w-full h-full"
            src="/door.svg"
            alt="door to solana"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
