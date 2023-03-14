import Link from "next/link";

import { useState } from "react";
import ProfileButton from "../walletPage/Navbar/ProfileButton";

import Image from "next/image";
import RevealPrivateKey from "../walletPage/Navbar/RevealPrivateKey";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-30 w-full max-w-screen-xl py-3 mx-auto bg-transparent md:py-4 backdrop-filter backdrop-blur-lg">
      <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row space-x-4">
            <Image
              className="justify-self-center"
              src="/logo.svg"
              alt="logo"
              width={24}
              height={24}
            />
            <Link
              href="/"
              className="font-bold text-[#FCFCFC] font-ksans text-2xl lg:text-3xl"
            >
              RayAuth
            </Link>
          </div>
          <div className="hidden md:block font-ksans">
            <div className="flex items-baseline ml-10 space-x-12">
              <a
                href="https://twitter.com/rayauthhq"
                target={"_blank"}
                className="text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
                rel="noreferrer"
              >
                TWITTER
              </a>
              <a
                href="https://docs.rayauth.com/"
                target={"_blank"}
                className="text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
                rel="noreferrer"
              >
                DOCS
              </a>
              <Link
                href="/wallet"
                className="text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
              >
                WALLET
              </Link>

              <Link
                href="/demo"
                className="text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
              >
                DEMO
              </Link>

              <ProfileButton />
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="flex flex-col items-baseline w-full space-x-6 text-center">
          <a
            href="https://twitter.com/rayauthhq"
            target={"_blank"}
            className="w-full text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
            rel="noreferrer"
          >
            TWITTER
          </a>
          <a
            href="https://docs.rayauth.com/"
            target={"_blank"}
            className="w-full text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
            rel="noreferrer"
          >
            DOCS
          </a>
          <Link
            href="/wallet"
            className="w-full text-base font-semibold text-white rounded-md hover:text-slate-200 hover:border-b-1"
          >
            WALLET
          </Link>
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
