import LoginRequired from "@/components/common/LoginRequired";
import MainLayout from "@/components/layouts/MainLayout";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

const DemoPage = () => {
  const { publickey } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center max-w-4xl mx-auto mt-16 space-y-16 text-white">
        <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] md:left-[450px] top-[158px] md:top-[100px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-50" />

        <h1 className="text-4xl font-bold">RayAuth Demo</h1>

        <p className="max-w-xl text-center">
          This demo showcases gasless transactions, signing transactions with
          the RayAuth wallet and session keys with the help of a producthunt
          clone
        </p>

        {publickey ? (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row p-4 space-x-8 bg-[#111111] w-[24rem] md:w-[32rem] rounded-2xl">
              <img
                src={"https://source.unsplash.com/random/200x200"}
                alt={"test"}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-4">
                  <h2 className="text-2xl font-bold">RayAuth</h2>
                  <a
                    className="text-[#1DA1F2]"
                    href="https://twitter.com/RayAuthHQ"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @RayAuthHQ
                  </a>
                  <a
                    href="https://rayauth.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    rayauth.com
                  </a>
                </div>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                  tempora laborum, eaque, omnis mollitia enim itaque autem
                  tenetur quam laboriosam earum sit magni. Quis perferendis
                  quasi blanditiis, exercitationem architecto odio.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <LoginRequired />
        )}
      </div>
    </>
  );
};

DemoPage.PageLayout = MainLayout;

export default DemoPage;
