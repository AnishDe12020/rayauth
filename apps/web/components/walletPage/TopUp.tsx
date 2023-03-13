import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../common/Button";
import { IoCopyOutline } from "react-icons/io5";
import QRCode from "react-qr-code";
import { toast } from "sonner";

interface Props {
  publicKey: string;
}

export default function TopUp({ publicKey }: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(publicKey.toString());
    toast.success("Copied public key to clipboard");
  };

  return (
    <>
      <Button
        className="justify-center w-full m-3 bg-slate-200"
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
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="px-4 text-xl font-medium leading-6 text-white"
                  >
                    TopUp
                  </Dialog.Title>
                  <div className="flex flex-row items-center justify-center w-full m-2 ml-0">
                    <div className="p-1 bg-gray-700 rounded-lg border-slate-400">
                      <QRCode size={150} value={publicKey} />
                    </div>
                  </div>
                  <div className="m-2 ml-0">
                    <div className="flex flex-row ">
                      <input
                        type="text"
                        value={publicKey}
                        className="text-white m-2 my-2 border bg-slate-900 border-slate-600 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                      />
                      <Button
                        className="justify-center p-2 py-0 my-3 w-14"
                        onClick={handleCopyPublicKey}
                      >
                        <IoCopyOutline />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-row justify-end w-full m-2 mt-4">
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
