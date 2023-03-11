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

export default function ProfileButton() {
  const { asPath } = useRouter();
  const { publickey } = useAuth();
  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(`${publickey?.toString()}`);
    toast.success("Copied public key to clipboard");
  };
  return (
    <div className=" max-w-sm px-4 w-full">
      <Popover className="relative">
        {({ open }) => (
          <>
            <div className="flex justify-center items-center">
              {asPath === "/" ? (
                <button className="rounded-2xl text-black bg-white px-3 py-1 hover:bg-slate-200">
                  <Link href={"/wallet"}>Get Started</Link>
                </button>
              ) : (
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-transparent px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
                >
                  <span>Account</span>
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-[90%] transform px-4 sm:px-0 lg:max-w-md bg-gray-900 rounded-md ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-3">
                  <div className="flex w-full items-center m-4">
                    <div className="mx-2">
                      <button
                        onClick={handleCopyPublicKey}
                        className="p-1 border rounded-full active:bg-gray-700"
                      >
                        <FiCopy className="text-sm text-white" />
                      </button>
                    </div>
                    <div className="mx-2">
                      <h4 className=" text-gray-300 text-xs truncate block w-50">
                        {publickey?.toString()}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="w-full"></div>
                    <Button className=" mx-2 bg-gray-800 text-slate-400  rounded-md border p-3 text-center ">
                      Logout
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
