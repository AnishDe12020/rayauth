import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../common/Button";
import { IoCopyOutline } from "react-icons/io5";
import QRCode from "react-qr-code";

interface Props {
  address?: string;
}

export default function TopUp({
  address = "2Mosti3c3vpH8MZvnur6y1B4x2r9iZXW373LoY4yN72X",
}: Props) {
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
        TopUp
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
                    className="text-xl font-medium leading-6 text-white px-4"
                  >
                    TopUp
                  </Dialog.Title>
                  <div className="m-2 ml-0 flex flex-row items-center justify-center w-full">
                    <div className="p-1 bg-gray-700 rounded-lg border-slate-400">
                      <QRCode size={150} value={address} />
                    </div>
                  </div>
                  <div className="m-2 ml-0">
                    <div className="flex flex-row ">
                      <input
                        type="text"
                        value={address}
                        className="text-white m-2 my-2 border bg-slate-900 border-slate-600 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                      />
                      <Button className="p-2 py-0 my-3 w-14 justify-center">
                        <IoCopyOutline />
                      </Button>
                    </div>
                  </div>

                  <div className="m-2 mt-4 w-full flex flex-row justify-end">
                    <button
                      onClick={() => closeModal()}
                      className="w-[200px] bg-gray-700 border border-gray-900 p-2 rounded-lg text-white hover:bg-gray-800"
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
