import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../common/Button";

export default function Transfer() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        className="w-full m-3 justify-center bg-slate-200"
        type="button"
        onClick={openModal}
      >
        Transfer
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white px-4"
                  >
                    Transfer
                  </Dialog.Title>
                  <div className="m-2 ml-0 flex flex-row w-full">
                    <input
                      type="number"
                      defaultValue={0}
                      className="mx-2 text-white border bg-slate-800 border-slate-700 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-4 "
                    />

                    <select className=" text-white border bg-slate-800 border-slate-700 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-1/5 p-4 ">
                      <option value="solana">Solana</option>
                      <option value="usdc">USDC</option>
                      <option value="bonk">BONK</option>
                    </select>
                  </div>
                  <div className="m-2 ml-0">
                    <label className="text-slate-300 text-sm mx-2 my-2">
                      Send to
                    </label>
                    <input
                      type="text"
                      placeholder="Enter recipient address"
                      className="text-white m-2 my-2 border bg-slate-800 border-slate-700 text-xs rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                    />
                  </div>

                  <div className="m-2 mt-4 flex flex-row justify-between">
                    <button className="bg-gray-700 border border-gray-900 p-2 rounded-lg text-white hover:bg-gray-800 w-full md:w-[200px]">
                      Transfer
                    </button>
                    <button
                      onClick={() => closeModal()}
                      className="bg-gray-700 border border-gray-900 p-2 rounded-lg text-white hover:bg-gray-800 w-full md:w-[200px]"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
