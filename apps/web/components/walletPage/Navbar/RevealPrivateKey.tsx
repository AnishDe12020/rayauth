import Button from "@/components/common/Button";
import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";
import { BACKEND_URL } from "@/lib/constants";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import arr from "hex-array";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
export default function RevealPrivateKey() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { jwt } = useAuth();

  const { deviceShare } = useDeviceShare();
  function closeModal() {
    setIsOpen(false);
  }
  const [privateKey, setPrivateKey] = useState<string>("");
  const handleCopyPrivateKey = () => {
    navigator.clipboard.writeText(privateKey);
    toast.success("Copied Private key to clipboard");
  };
  useEffect(() => {
    const setData = async () => {
      if (!jwt) {
        return;
      }

      const {
        data: { key },
      } = await axios.get(`${BACKEND_URL}/private-key`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          AuthorizationBasic: `Basic ${deviceShare}`,
        },
      });

      const keypair = Keypair.fromSecretKey(arr.fromString(key));
      setPrivateKey(base58.encode(keypair.secretKey));
    };
    setData();
  }, [jwt]);

  return (
    <>
      <div className="flex justify-center w-full mt-10">
        <button
          onClick={() => setIsOpen(true)}
          className="w-1/2 p-3 px-4 py-2 mx-2 text-xs font-semibold tracking-widest text-center uppercase transition duration-150 ease-in-out bg-gray-800 border border-gray-500 rounded-md active:bg-gray-500 hover:opacity-80 hover:bg-black hover:border-slate-200 hover:text-white text-slate-400"
        >
          Reveal Private Key
        </button>
      </div>
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
                    Private Key
                  </Dialog.Title>

                  <div className="m-2 ml-0">
                    <div className="flex flex-row ">
                      <input
                        type={privateKey ? "password" : "text"}
                        value={privateKey || "Loading..."}
                        className="text-white m-2 my-2 border bg-slate-900 border-slate-600 text-sm rounded-md focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 "
                      />

                      <Button
                        className="justify-center p-2 py-0 my-3 w-14"
                        onClick={handleCopyPrivateKey}
                      >
                        <IoCopyOutline />
                      </Button>
                    </div>
                    <p className="font-bold text-center text-red-700">
                      Save and Keep Private Key Securely
                    </p>
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
