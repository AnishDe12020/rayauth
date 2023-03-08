import React from "react";
import { AiOutlineQrcode, AiOutlineScan } from "react-icons/ai";
import Receive from "./Receive";
type Props = {
  address?: string;
};

const AccountOption = ({
  address = "2Mosti3c3vpH8MZvnur6y1B4x2r9iZXW373LoY4yN72X",
}: Props) => {
  return (
    <div>
      <div className="flex flex-row items-center">
        <Receive>
          <button className="md:px-6 border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl mx-2 px-4">
            <AiOutlineQrcode className="text-sm" />
          </button>
        </Receive>

        <button
          onClick={() => {
            navigator.clipboard.writeText(address);
          }}
          className="text-xs truncate block w-28 border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl mx-2 px-4"
        >
          {address}
        </button>
        {/* <button className="hidden md:flex  flex-row items-center border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl mx-2  text-xs px-4">
          <AiOutlineScan className="mx-2 text-xs" /> scan and pay
        </button> */}
      </div>
      {/* <button className="md:hidden mt-3 w-fit mx-auto flex  flex-row items-center border border-transparent  h-fit py-1 lg:py-1 bg-gray-800 rounded-l-xl rounded-r-xl   text-xs px-4">
        <AiOutlineScan className="mx-2 text-xs" /> scan and pay
      </button> */}
    </div>
  );
};

export default AccountOption;
