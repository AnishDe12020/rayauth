import useAuth from "@/hooks/useAuth";
import React from "react";
import LoginRequired from "../common/LoginRequired";
import CreateDemoProject from "./createModal";

type Props = {};

const DemoPage = (props: Props) => {
  const { publickey } = useAuth();
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto mt-4 space-y-16 text-white">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] md:left-[450px] top-[158px] md:top-[100px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-50" />
      <h1 className="text-4xl font-bold">RayAuth Demo</h1>
      <p className="max-w-xl text-center">
        This demo showcases gasless transactions, signing transactions with the
        RayAuth wallet and session keys with the help of a producthunt clone
      </p>
      <CreateDemoProject />
      {publickey ? (
        <div className="flex flex-col space-y-4">
          <div className="shadow-xl flex flex-row p-4 space-x-8 bg-[#111111] w-[24rem] md:w-[32rem] rounded-2xl m-2 md:m-0">
            <img
              src={"https://source.unsplash.com/random/200x200"}
              alt={"test"}
              className="w-8 h-8 md:w-16 md:h-16 rounded-full"
            />
            <div className="flex flex-col ml-0">
              <div className="flex flex-col items-right">
                <h2 className="text-lg md:text-2xl font-bold">RayAuth</h2>
                <div className="flex flex-row ml-0 w-full">
                  <a
                    className="text-[#1DA1F2] text-xs md:text-sm ml-0 mr-2"
                    href="https://twitter.com/RayAuthHQ"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @RayAuthHQ
                  </a>
                  <a
                    className="text-xs md:text-sm text-gray-500"
                    href="https://rayauth.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    rayauth.com
                  </a>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-300 font-ksans">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                tempora laborum, eaque, omnis mollitia enim itaque autem tenetur
                quam laboriosam earum sit magni. Quis perferendis quasi
                blanditiis, exercitationem architecto odio.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoginRequired />
      )}
    </div>
  );
};

export default DemoPage;
