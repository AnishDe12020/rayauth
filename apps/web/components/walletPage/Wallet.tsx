import React from "react";
import { AiOutlineQrcode, AiOutlineScan, AiOutlineWifi } from "react-icons/ai";
import Button from "../common/Button";
import { BiRefresh } from "react-icons/bi";
import Transfer from "./Transfer";
import TopUp from "./TopUp";
type Props = {};
const AccountOption = () => {
  return (
    <div className="flex flex-row items-center">
      <button className="border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl mx-2 px-4">
        <AiOutlineQrcode className="text-sm" />
      </button>
      <button className="text-xs truncate block w-28 border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl mx-2 px-4">
        34RnhgE7QspZjU1KX5fpbKJuJPNPto3TVTn9Em7Ei8SM
      </button>
      <button className=" flex flex-row items-center border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl mx-2  text-xs px-4">
        <AiOutlineScan className="mx-2 text-xs" /> scan and pay
      </button>
    </div>
  );
};
const Wallet = (props: Props) => {
  return (
    <div className="my-1 md:my-6 block max-w-2xl p-6  border border-transparent rounded-lg shadow  mx-auto font-ksans">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] lg:left-[530px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />

      <div className="flex flex-col text-white ">
        {/* Header */}
        <div className="flex flex-row justify-between w-full py-6 ">
          <div>
            <h3 className="font-ksans text-xl lg:text-3xl font-medium">
              Account Balance
            </h3>
          </div>
          <div className="hidden lg:block">
            <AccountOption />
          </div>
        </div>
        {/* Body */}
        <div className="border border-transparent rounded-lg shadow bg-slate-900 p-6">
          <div className="flex flex-row justify-between items-center">
            <div className="font-ksans text-lg font-semibold">TOTAL VALUE</div>
            <div>
              <span className="text-sm text-gray-400 font-medium flex flex-row items-center">
                <span className="mx-2">
                  <AiOutlineWifi />
                </span>
                Solana Mainnet
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-end py-6">
            <div className="flex flex-row items-end">
              <span className="text-3xl font-bold text-gray-400">12</span>

              <select
                id="currency"
                className="bg-transparent  text-white text-xs block w-fit p-0 "
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400">
                1 SOL = 22.85 USD
              </span>
            </div>
          </div>
          <div className="flex flex-row">
            <TopUp />
            <Transfer />
          </div>
        </div>
        <div className=" lg:hidden my-4 flex justify-center">
          <AccountOption />
        </div>
        {/* Footer */}
        <div className="py-4">
          <div className="my-4">
            <h2 className="font-medium">Tokens</h2>
          </div>
          <div className="flex flex-col border border-transparent rounded-t-lg shadow bg-slate-900 p-3">
            <div className="my-2">
              <div className="flex flex-row justify-between">
                <h3 className="text-sm font-bold">Solana</h3>
                <h3 className="text-sm font-medium">~ 0 SOL</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-transparent rounded-b-lg shadow bg-slate-800 p-3">
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
          <div className="flex flex-col border border-transparent rounded-t-lg shadow bg-slate-900 p-3">
            <div className="my-2">
              <div className="flex flex-row justify-center">
                <h3 className="text-sm font-bold text-gray-400">
                  Did not See Your Token?
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-transparent rounded-b-lg shadow bg-slate-800 p-3">
            <div className="my-2 ">
              <div className="flex flex-row justify-center">
                <button className="text-sm text-blue-200">Import Token</button>
              </div>
            </div>
          </div>
        </div>
        {/* Refresh Token Section */}
        <div className="w-full my-2 mt-5 flex flex-row justify-end">
          <div className="flex flex-col justify-end items-end">
            <button className="my-3 w-fit flex flex-row justify-center items-center text-xs p-2 bg-gray-700 rounded-full">
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
