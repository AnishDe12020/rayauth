import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsPlus } from "react-icons/bs";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className="bg-white rounded-full py-1  px-3 font-medium flex  items-center hover:bg-slate-200"
        >
          <BsPlus className="text-2xl" />
          <span>New Project</span>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-slate-400"
                  >
                    Create a new project
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <Input
                        label={"Name"}
                        className="bg-gray-700 border-0 text-white"
                      />
                    </div>
                    <div>
                      <Input
                        label={"Description"}
                        className="bg-gray-700 border-0 text-white"
                      />
                    </div>
                    <div>
                      <Input
                        label={"xyz"}
                        className="bg-gray-700 border-0 text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button className="text-white text-base text-center bg-gray-800">
                      Create
                    </Button>
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
