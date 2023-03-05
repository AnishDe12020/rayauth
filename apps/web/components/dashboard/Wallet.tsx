import React, { useEffect } from "react";
import { AiOutlineQrcode, AiOutlineScan, AiOutlineWifi } from "react-icons/ai";
import Button from "../common/Button";
import { BiRefresh } from "react-icons/bi";
import useAuth from "@/hooks/useAuth";
import useCluster from "@/hooks/useCluster";
import { Cluster } from "@/types/cluster";

type Props = {};

const AccountOption = () => {
  return (
    <div className="flex flex-row items-center">
      <button className="p-1 mx-2 border rounded-full h-fit lg:p-2">
        <AiOutlineQrcode />
      </button>
      <button className="block p-1 px-2 mx-2 text-xs truncate border rounded-full w-28 lg:p-2">
        34RnhgE7QspZjU1KX5fpbKJuJPNPto3TVTn9Em7Ei8SM
      </button>
      <button className="flex flex-row items-center p-1 px-2 mx-2 text-xs border rounded-full lg:p-2">
        <AiOutlineScan className="mx-2 text-sm" /> scan and pay
      </button>
    </div>
  );
};

const Wallet = (props: Props) => {
  const { user, publickey } = useAuth();
  const { cluster, setCluster, connection } = useCluster();

  useEffect(() => {
    const getWalletData = async () => {
      if (!publickey) return;

      const solBalance = await connection.getBalance(publickey);
      console.log(solBalance);
    };

    getWalletData();
  });

  return (
    <div className="block max-w-2xl p-6 mx-auto my-1 border border-transparent rounded-lg shadow md:my-6 font-ksans">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] lg:left-[530px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />

      <div className="flex flex-col text-white ">
        {/* Header */}
        <div className="flex flex-row justify-between w-full py-6 ">
          <div>
            <h3 className="text-xl font-medium font-ksans lg:text-3xl">
              Account Balance
            </h3>
          </div>
          <div className="hidden lg:block">
            <AccountOption />
          </div>
        </div>
        {/* Body */}
        <div className="p-6 border border-transparent rounded-lg shadow bg-slate-900">
          <div className="flex flex-row items-center justify-between">
            <div className="text-lg font-semibold font-ksans">TOTAL VALUE</div>
            <div>
              <span className="flex flex-row items-center text-sm font-medium text-gray-400">
                <span className="mx-2">
                  <AiOutlineWifi />
                </span>
                <select
                  className="block p-0 text-gray-400 bg-transparent"
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value as Cluster)}
                >
                  <option value={Cluster.MainnetBeta}>Solana Mainnet</option>
                  <option value={Cluster.Devnet}>Solana Devnet</option>
                </select>
              </span>
            </div>
          </div>
          <div className="flex flex-row items-end justify-between py-6">
            <div className="flex flex-row items-end">
              <span className="text-3xl font-bold text-gray-200">12</span>
              <span className="ml-2 text-xl font-bold text-gray-400">USD </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">
                1 SOL = 22.85 USD
              </span>
            </div>
          </div>
          <div className="flex flex-row">
            <Button className="justify-center w-full m-3 bg-slate-200">
              Top Up
            </Button>
            <Button className="justify-center w-full m-3 bg-slate-200">
              Transfer
            </Button>
          </div>
        </div>
        <div className="flex justify-center my-4 lg:hidden">
          <AccountOption />
        </div>
        {/* Footer */}
        <div className="py-4">
          <div className="my-4">
            <h2 className="font-medium">Tokens</h2>
          </div>
          <div className="flex flex-col p-3 border border-transparent rounded-t-lg shadow bg-slate-900">
            <div className="my-2">
              <div className="flex flex-row justify-between">
                <h3 className="text-sm font-bold">Solana</h3>
                <h3 className="text-sm font-medium">~ 0 SOL</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3 border border-transparent rounded-b-lg shadow bg-slate-800">
            <div className="my-2 ">
              <div className="flex flex-row justify-between">
                <h3 className="text-xs">1 SOL ≈ 22.85 USD</h3>
                <h3 className="text-xs font-medium">~0.00 USD</h3>
              </div>
            </div>
          </div>
        </div>
        {/* Below Token Import section */}
        <div>
          <div className="flex flex-col p-3 border border-transparent rounded-t-lg shadow bg-slate-900">
            <div className="my-2">
              <div className="flex flex-row justify-center">
                <h3 className="text-sm font-bold text-gray-400">
                  Did not See Your Token?
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3 border border-transparent rounded-b-lg shadow bg-slate-800">
            <div className="my-2 ">
              <div className="flex flex-row justify-center">
                <button className="text-sm text-blue-200">Import Token</button>
              </div>
            </div>
          </div>
        </div>
        {/* Refresh Token Section */}
        <div className="flex flex-row justify-end w-full my-2 mt-5">
          <div className="flex flex-col items-end justify-end">
            <button className="flex flex-row items-center justify-center p-2 my-3 text-xs bg-gray-700 rounded-full w-fit">
              <BiRefresh className="mx-1 text-sm" /> Refresh Token
            </button>
            <span className="text-xs text-gray-600">
              Last update 02/26/2023, 07:50 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
