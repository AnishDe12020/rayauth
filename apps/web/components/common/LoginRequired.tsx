import Link from "next/link";
import React from "react";
import Button from "./Button";

type Props = {};

const LoginRequired = (props: Props) => {
  return (
    <div className="flex h-[80vh]">
      <div className="m-auto mx-auto ">
        <h2 className="text-white ">You need to login to access this page</h2>
        <div className="w-full mx-auto my-8">
          <p className="text-lg text-center text-white py-2 px-4 bg-gray-900 w-fit rounded-lg mx-auto hover:bg-gray-800">
            <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
