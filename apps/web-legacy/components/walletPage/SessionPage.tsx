import React from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import { Disclosure } from "@headlessui/react";
import Button from "../common/Button";
type Props = {};
const Session = (props: Props) => {
  return (
    <div className="my-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="py-2 w-full">
              <div className="flex flex-col border border-transparent rounded-t-lg shadow bg-slate-900 p-3">
                <div className="my-2">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-sm font-bold">Pune</h3>
                    <span className="text-lg">
                      {open ? <BiChevronUp /> : <BiChevronDown />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border border-transparent rounded-b-lg shadow bg-slate-800 p-3">
                <div className="my-2 ">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xs">10 hours ago</h3>
                    <h3 className="text-xs font-medium">Apple Iphone 13</h3>
                  </div>
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500 flex justify-center py-4">
              <Button className="bg-transparent text-white outline-1 border border-gray-400 active:bg-slate-500">
                Invalidated Session
              </Button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
const Sessions = (props: Props) => {
  return (
    <div className="my-1 md:my-6 block max-w-2xl p-6  border border-transparent rounded-lg shadow  mx-auto font-ksans">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] lg:left-[530px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />

      <div className="flex flex-col text-white ">
        {/* Header */}
        <div className="flex flex-row justify-center w-full py-6 ">
          <div>
            <h3 className="font-ksans text-center md:text-left text-xl lg:text-2xl font-medium">
              Active Sessions
            </h3>
          </div>
        </div>
        {/* Body */}
        <div className="border border-transparent rounded-lg shadow bg-slate-900 p-6">
          {[0, 1, 2, 3, 4].map((token, key) => {
            return <Session key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sessions;
