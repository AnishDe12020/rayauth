import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useDappHuntProgram } from "@/hooks/useDappHuntProgram";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const inputClassName =
  "rounded-lg px-3 py-2 my-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-gray-700 border-0 text-white w-full";

export default function CreateDemoProject() {
  let [isOpen, setIsOpen] = useState(false);

  const { postNewProduct, isPostingProduct } = useDappHuntProgram();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleHuntProduct = handleSubmit(async (data) => {
    await postNewProduct(
      data.name,
      data.maker_twitter || "",
      data.twitter_url || "",
      data.website_url || "",
      data.logo_url || "",
      data.description || ""
    );

    closeModal();
  });

  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className="flex items-center px-3 py-1 font-medium text-black bg-white rounded-full hover:bg-slate-200"
        >
          <BsPlus className="text-2xl" />
          <span>Hunt Product</span>
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
                <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-slate-400"
                  >
                    Hunt a new product
                  </Dialog.Title>
                  <form onSubmit={handleHuntProduct}>
                    <div className="mt-2">
                      <div>
                        <label className="py-2 my-4 font-semibold text-white">
                          Maker Twitter
                        </label>
                        <input
                          className={inputClassName}
                          {...register("maker_twitter", { required: true })}
                        />
                      </div>
                      <div>
                        <label className="py-2 my-4 font-semibold text-white">
                          Name
                        </label>
                        <input
                          className={inputClassName}
                          {...register("name", { required: true })}
                        />
                      </div>
                      <div>
                        <label className="py-2 my-4 font-semibold text-white">
                          Description
                        </label>
                        <input
                          className={inputClassName}
                          {...register("description")}
                        />
                      </div>
                      <div>
                        <label className="py-2 my-4 font-semibold text-white">
                          Logo Url
                        </label>
                        <input
                          className={inputClassName}
                          {...register("logo_url")}
                        />
                      </div>
                      <div>
                        <label className="py-2 my-4 font-semibold text-white">
                          Website
                        </label>
                        <input
                          className={inputClassName}
                          {...register("website_url")}
                        />
                      </div>
                      <div>
                        <label className="py-2 my-4 font-semibold text-white">
                          Twitter
                        </label>
                        <input
                          className={inputClassName}
                          {...register("twitter_url")}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end w-full mt-5 space-x-4">
                      <Button
                        onClick={() => closeModal()}
                        className="text-base text-center text-white bg-gray-800"
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="text-base text-center text-white bg-gray-800"
                        processing={isPostingProduct}
                      >
                        Hunt
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
