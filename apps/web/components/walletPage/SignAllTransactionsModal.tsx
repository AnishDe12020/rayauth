import useTxModal from "@/hooks/useTxModal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SignAllTransactions from "./SignAllTransactions";

const SignAllTransactionModal = () => {
  const { signAllModalOpen, setSignAllTxModalOpen } = useTxModal();

  function closeModal() {
    setSignAllTxModalOpen(false);
  }

  return (
    <Transition appear show={signAllModalOpen} as={Fragment}>
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
                <SignAllTransactions useHook />

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
  );
};

export default SignAllTransactionModal;
