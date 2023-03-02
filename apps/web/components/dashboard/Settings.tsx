import React from "react";
import { AiOutlineLock, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";
import { IoLanguageOutline } from "react-icons/io5";
import Button from "../common/Button";

import Input from "../common/Input";

type Props = {};

const Settings = (props: Props) => {
  return (
    <div className="text-white max-w-screen-xl mx-auto pt-8 mb-24">
      <div className="mb-6">
        <h2 className="font-ksans text-3xl font-semibold text-center ">
          Settings
        </h2>
      </div>
      <div className="flex w-full justify-around flex-col md:flex-row">
        {/* left */}
        {/* Privacy and Security */}
        <div className="w-full md:w-1/2 m-1 md:m-2  ">
          <div className="bg-slate-900 rounded-md p-4 m-2">
            <div>
              <h2 className="text-slate-300 font-ksans text-xl font-semibold flex items-center">
                <AiOutlineLock className="mx-2 font-semibold" />
                Privacy and Security
              </h2>
            </div>
            <div className="my-4 mx-4">
              <Button className="text-2xl w-full py-3 bg-slate-400 hover:bg-slate-500 font-medium ">
                <HiOutlineKey className="w-6" /> Account Details
              </Button>
            </div>
          </div>
          {/* Address Book */}
          <div className="bg-slate-900 rounded-md p-4 m-2">
            <div>
              <h2 className="text-slate-300 font-ksans text-xl font-semibold flex items-center">
                <FaRegAddressBook className="mx-2 font-semibold" />
                Address Book
              </h2>
            </div>
            <div>
              <div className="my-4 mx-4 flex justify-between items-center">
                <div>
                  <p className="text-xs md:text-sm m-0 md:m-2 text-slate-300 font-semibold">
                    List of Contacts
                  </p>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="text-white border bg-slate-800 border-slate-800 text-xs rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                    placeholder="search by name"
                    required
                  />
                  <div className="mx-2 w-full">
                    <select className="text-white border bg-slate-800 border-slate-800 text-xs rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 ">
                      <option value="all">All</option>
                      <option value="address">Solana Address</option>
                      <option value="soldomain">Sol Domain</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="my-4 mx-4 flex justify-between items-center">
                <div className=" m-2 w-full ">
                  <div className="rounded-lg w-full border border-gray-800 text-slate-300 text-sm py-2 px-2 flex items-center justify-between">
                    <span className="truncate">
                      USDC - EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
                    </span>
                    <button>
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4 mx-4">
              <h5 className="text-sm text-slate-300 font-semibold">
                Add new contact
              </h5>
              <div className=" w-full">
                <div className="flex w-full">
                  <input
                    type="text"
                    placeholder="Enter Contact Name"
                    className="text-white m-2 my-2 border bg-slate-800 border-slate-800 text-xs rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                  />

                  <div className=" m-2 my-2 w-full">
                    <select className="text-white border bg-slate-800 border-slate-800 text-xs rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 ">
                      <option value="address">Solana Address</option>
                      <option value="soldomain">Sol Domain</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Contact Public Address"
                    className="text-white m-2 my-2 border bg-slate-800 border-slate-800 text-xs rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                  />
                </div>
                <div className="m-4 w-full flex justify-end mr-6">
                  <Button className="bg-slate-400">Add Contact</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="w-full md:w-1/2 m-1 md:m-2">
          {/* Network */}
          <div className="bg-slate-900 rounded-md p-4 py-6 m-2">
            <div>
              <h2 className="text-slate-300 font-ksans text-xl font-semibold flex items-center">
                <BsGlobe2 className="mx-2 font-semibold" />
                Network
              </h2>
            </div>
            <div className="my-4 mx-4">
              <h5 className="text-sm text-slate-300 font-semibold my-4">
                Select Network
              </h5>
              <div className="mx-2 w-full">
                <select className="text-white border bg-slate-800 border-slate-800 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-4 ">
                  <option value="mainnet">Solana Mainnet</option>
                  <option value="testnet">Solana Testnet</option>
                  <option value="devnet">Sol Devnet</option>
                </select>
              </div>
            </div>
          </div>
          {/* Theme */}
          <div className="bg-slate-900 rounded-md p-4 py-6 m-2">
            <div>
              <h2 className="text-slate-300 font-ksans text-xl font-semibold flex items-center">
                <IoMdOptions className="mx-2 font-semibold" />
                Display
              </h2>
            </div>
            <div className="my-4 mx-4">
              <h5 className="text-sm text-slate-300 font-semibold my-4">
                Switch Theme
              </h5>
              <div className="mx-2 w-full">
                <label className="relative inline-flex items-center mb-5 cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer " />
                  <div className="z-0 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          {/* Language */}
          <div className="bg-slate-900 rounded-md p-4 py-6 m-2">
            <div>
              <h2 className="text-slate-300 font-ksans text-xl font-semibold flex items-center">
                <IoLanguageOutline className="mx-2 font-semibold" />
                Language
              </h2>
            </div>
            <div className="my-4 mx-4">
              <h5 className="text-sm text-slate-300 font-semibold my-4">
                Select Language
              </h5>
              <div className="mx-2 w-full">
                <select className="text-white border bg-slate-800 border-slate-800 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-4 ">
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Russian">Russian</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
