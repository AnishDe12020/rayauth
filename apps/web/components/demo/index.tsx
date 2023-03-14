import useAuth from "@/hooks/useAuth";
import { useDappHuntProgram } from "@/hooks/useDappHuntProgram";
import { useSessionProgram } from "@/hooks/useSessionProgram";
import React from "react";
import Button from "../common/Button";
import LoginRequired from "../common/LoginRequired";
import SignAllTransactionModal from "../walletPage/SignAllTransactionsModal";
import SignTransactionModal from "../walletPage/SignTransactionModal";
import CreateDemoProject from "./createModal";

type Props = {};

const DemoPage = (props: Props) => {
  const { publickey } = useAuth();

  const { sessionKeypair, addSessionToken, revokeSessionToken } =
    useSessionProgram();

  const { dapps } = useDappHuntProgram();

  console.log("dapps", dapps);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto mt-4 space-y-16 text-white">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] md:left-[450px] top-[158px] md:top-[100px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-50" />

      <div className="absolute">
        <SignTransactionModal />
        <SignAllTransactionModal />
      </div>

      <h1 className="text-4xl font-bold">RayAuth Demo</h1>
      <p className="max-w-xl text-center">
        This demo showcases gasless transactions, signing transactions with the
        RayAuth wallet and session keys with the help of a producthunt clone
      </p>

      {publickey ? (
        <>
          <CreateDemoProject />

          {sessionKeypair ? (
            <div className="flex flex-col items-center space-y-4">
              {dapps &&
                dapps.length > 0 &&
                dapps.map((dapp: any) => {
                  return (
                    <div
                      className="shadow-xl flex flex-row p-4 space-x-8 bg-[#111111] w-[24rem] md:w-[32rem] rounded-2xl m-2 md:m-0"
                      key={dapp.publicKey}
                    >
                      <img
                        src={
                          dapp.account.logoUrl ||
                          "https://source.unsplash.com/random/200x200"
                        }
                        alt={dapp.account.name}
                        className="w-8 h-8 rounded-full md:w-16 md:h-16"
                      />
                      <div className="flex flex-col ml-0">
                        <div className="flex flex-col items-right">
                          <div className="flex flex-row justify-between">
                            <h2 className="text-lg font-bold md:text-2xl">
                              {dapp.account.name}
                            </h2>

                            {/* <div className="flex flex-row space-x-4">
                              <p>{dapp.account.upvotes.toString()} Upvotes</p>
                              <button
                                className="h-6 px-4 text-sm text-black bg-white rounded-lg hover:bg-slate-200"
                                onClick={() => upvoteProduct(dapp.account.name)}
                              >
                                Upvote
                              </button>
                            </div> */}
                          </div>
                          <div className="flex flex-row w-full ml-0">
                            <a
                              className="text-[#1DA1F2] text-xs md:text-sm ml-0 mr-2"
                              href={dapp.account.twitterUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              @{dapp.account.twitterUrl.split("/").pop()}
                            </a>
                            <a
                              className="text-xs text-gray-500 md:text-sm"
                              href={dapp.account.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {dapp.account.websiteUrl}
                            </a>
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 md:text-sm font-ksans">
                          {dapp.account.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              <button
                onClick={revokeSessionToken}
                className="flex items-center px-3 py-1 font-medium text-black bg-white rounded-full hover:bg-slate-200 w-fit"
              >
                <span>Revoke current session key</span>
              </button>
            </div>
          ) : (
            <button
              onClick={addSessionToken}
              className="flex items-center px-3 py-1 font-medium text-black bg-white rounded-full hover:bg-slate-200"
            >
              <span>Create Session Key</span>
            </button>
          )}
        </>
      ) : (
        <LoginRequired />
      )}
    </div>
  );
};

export default DemoPage;
