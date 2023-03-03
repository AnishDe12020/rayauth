import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsWallet2 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

type Props = {};

const Links = [
  {
    name: "Wallet",
    href: "/wallet",
    icon: <BsWallet2 />,
  },
  {
    name: "NFTs",
    href: "/nft",
    icon: <AiOutlineHome />,
  },

  {
    name: "Settings",
    href: "/settings",
    icon: <IoSettingsOutline />,
  },
];

const Navbar = (props: Props) => {
  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <div className="flex flex-row justify-between py-5 md:py-0 text-white w-full px-4 items-center border-b border-gray-400">
      <div>
        <h2 className="font-ksans text-2xl font-medium">RayAuth</h2>
      </div>
      <div className="z-20 flex flex-row flex-1 justify-center fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0 md:static md:translate-x-0 md:translate-y-0 bg-gray-900 lg:bg-transparent w-full">
        {Links.map((link, key) => {
          return (
            <div
              key={key}
              className={`${
                asPath === link.href
                  ? "text-white border-white "
                  : "text-gray-500"
              } mx-8 py-5 border-b border-transparent hover:border-white  hover:text-white font-ksans`}
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
