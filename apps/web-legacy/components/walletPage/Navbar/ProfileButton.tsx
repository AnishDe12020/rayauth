import { Popover, Transition } from "@headlessui/react";
import { CiCircleChevDown } from "react-icons/ci";
import { Fragment } from "react";
import Button from "@/components/common/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { truncatePubkey } from "@/utils/truncate";

export default function ProfileButton() {
  const { asPath } = useRouter();
  const { publickey, signOut } = useAuth();
  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(`${publickey?.toString()}`);
    toast.success("Copied public key to clipboard");
  };
  return (
    <div className="w-full ">
      <Popover className="relative">
        {({ open }) => (
          <>

            <div className="flex justify-center items-center">
              {!publickey ? (
                <button className="rounded-2xl text-black bg-white px-3 py-1 hover:bg-slate-200">
                  <Link href={"/wallet"}>Get Started</Link>
                </button>
              ) : (
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-transparent px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
                >
                  <span className="px-5 text-base font-semibold text-white uppercase rounded-md hover:text-slate-200 hover:border-b-1">
                    Account
                  </span>
                  <CiCircleChevDown
                    className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                    aria-hidden="true"
                  />
                </Popover.Button>
              )}
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {publickey ? (
                <Popover.Panel className="absolute left-80 md:left-1/2 z-10 mt-3 w-screen max-w-xs md:max-w-sm -translate-x-[90%] transform px-0 md:px-4 sm:px-0 lg:max-w-md bg-gray-900 rounded-md ">
                  <div className="p-3 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center w-full m-4">
                      <div className="mx-2">
                        <button
                          onClick={handleCopyPublicKey}
                          className="p-1 border rounded-full active:bg-gray-700"
                        >
                          <FiCopy className="text-sm text-white" />
                        </button>
                      </div>
                      <div className="mx-2">
                        <h4 className="block text-xs text-gray-300 truncate md:hidden w-50">
                          {truncatePubkey(`${publickey?.toString()}`)}{" "}
                        </h4>
                        <h4 className="hidden text-xs text-gray-300 truncate md:block w-50">
                          {publickey?.toString()}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="w-full"></div>
                      <Button
                        className="p-3 mx-2 text-center bg-gray-800 border rounded-md text-slate-400"
                        onClick={signOut}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              ) : (
                <Popover.Panel className="p-4 absolute left-80 md:left-1/2 z-10 mt-3  max-w-xs md:max-w-sm -translate-x-[90%] transform px-0 md:px-4 sm:px-0 lg:max-w-sm bg-gray-900 rounded-md ">
                  <Button className="p-3 mx-auto text-center bg-gray-800 border rounded-md text-slate-400">
                    Login
                  </Button>
                </Popover.Panel>
              )}
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
