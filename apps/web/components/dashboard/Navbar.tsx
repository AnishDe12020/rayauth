import Link from "next/link";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsWallet2 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

type Props = {};

const Links = [
  {
    name: "Home",
    href: "/",
    icon: <AiOutlineHome />,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: <BsWallet2 />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <IoSettingsOutline />,
  },
];

const Navbar = (props: Props) => {
  return (
    <div className="flex flex-row justify-between py-5 md:py-0 text-white w-full px-4 items-center border-b border-gray-400">
      <div>
        <h2 className="font-ksans text-2xl font-medium">RayAuth</h2>
      </div>
      <div className=" flex flex-row flex-1 justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
        {Links.map((link, key) => {
          return (
            <div
              key={key}
              className="mx-8 py-5 border-b border-transparent hover:border-white text-gray-500 hover:text-white font-ksans"
            >
              <Link href={link.href} passHref>
                <div className="w-full">
                  <span className="flex md:hidden text-4xl text-center  justify-center">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="font-ksans font-normal">
        <h3>Sagar Gajare</h3>
      </div>
    </div>
  );
};

export default Navbar;
