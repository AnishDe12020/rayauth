import React from "react";
import { useRouter } from "next/router";
import { FiCopy } from "react-icons/fi";
import { toast } from "sonner";
import EditProjectModal from "./EditProjectModal";
type Props = {};

const ProjectPage = (props: Props) => {
  const router = useRouter();
  const { project } = router.query;
  console.log(project);
  // fetch Project Here
  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(`0x1234567890`);
    toast.success("Project Address Copied to clipboard");
  };
  const handleCopyPrivateKey = () => {
    navigator.clipboard.writeText(`0x1234567890`);
    toast.success("Private Key Copied to clipboard");
  };
  const handleCopyCallbackUrl = () => {
    navigator.clipboard.writeText(`http://rayauth.com/callback`);
    toast.success("Callback Url Copied to clipboard");
  };
  return (
    <div className="p-4 mt-6">
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-white">Project Name</h1>
          <EditProjectModal />
        </div>
        <div className="p-4 w-full bg-gray-800 rounded-md mt-6">
          <div className="w-full py-2 flex justify-between my-2">
            <h4 className=" text-gray-400">Project Address</h4>
            <div className="flex justify-between items-center">
              <button
                onClick={handleCopyPublicKey}
                className="p-1 border rounded-full active:bg-gray-700"
              >
                <FiCopy className="text-sm text-white" />
              </button>

              <h4 className="text-white mx-2">0x1234567890</h4>
            </div>
          </div>
          <div className="w-full py-2 flex justify-between my-2">
            <h4 className=" text-gray-400">Private Key</h4>
            <div className="flex justify-between items-center">
              <button
                onClick={handleCopyPrivateKey}
                className="p-1 border rounded-full active:bg-gray-700"
              >
                <FiCopy className="text-sm text-white" />
              </button>

              <h4 className="text-white mx-2">*********************</h4>
            </div>
          </div>
          <div className="w-full py-2 flex justify-between my-2">
            <h4 className=" text-gray-400">Call Back Url</h4>
            <div className="flex justify-between items-center">
              <button
                onClick={handleCopyCallbackUrl}
                className="p-1 border rounded-full active:bg-gray-700"
              >
                <FiCopy className="text-sm text-white" />
              </button>

              <h4 className="text-white mx-2">https://rayauth.com/callback</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
