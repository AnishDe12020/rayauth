import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const inputClassName =
  "rounded-lg px-3 py-2 my-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-gray-700 border-0 text-white w-full";
export default function CreateDemoProject() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className="bg-white text-black rounded-full py-1  px-3 font-medium flex  items-center hover:bg-slate-200"
        >
          <BsPlus className="text-2xl" />
          <span>New Project</span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
                    Create a new demo
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                      <div>
                        <label className="font-semibold text-white py-2 my-4">
                          Maker Twitter
                        </label>
                        <input
                          className={inputClassName}
                          {...register("maker_twitter", { required: true })}
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-white py-2 my-4">
                          Name
                        </label>
                        <input
                          className={inputClassName}
                          {...register("name", { required: true })}
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-white py-2 my-4">
                          Description
                        </label>
                        <input
                          className={inputClassName}
                          {...register("description")}
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-white py-2 my-4">
                          Logo Url
                        </label>
                        <input
                          className={inputClassName}
                          {...register("logo_url", { required: true })}
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-white py-2 my-4">
                          Website
                        </label>
                        <input
                          className={inputClassName}
                          {...register("website_url", { required: true })}
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-white py-2 my-4">
                          Twitter
                        </label>
                        <input
                          className={inputClassName}
                          {...register("twitter_url", { required: true })}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex w-full justify-between">
                      <Button
                        type="submit"
                        className="text-white text-base text-center bg-gray-800"
                      >
                        Create
                      </Button>
                      <Button
                        onClick={() => closeModal()}
                        className="text-white text-base text-center bg-gray-800"
                      >
                        Close
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
