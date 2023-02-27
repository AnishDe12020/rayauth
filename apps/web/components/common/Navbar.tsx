import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-transparent py-6 max-w-screen-xl mx-auto">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-bold text-[#FCFCFC] font-ksans text-2xl lg:text-3xl"
            >
              RayAuth
            </Link>
          </div>
          <div className="hidden md:block font-ksans">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="hover:text-slate-50 px-10  text-white rounded-md text-lg font-semibold"
              >
                MEMO
              </Link>
              <Link
                href="/"
                className="hover:text-slate-50 px-10  text-white rounded-md text-lg font-semibold"
              >
                DOCS
              </Link>
              <Link
                href="/contact"
                className="hover:text-slate-50 px-8   rounded-md text-lg font-semibold"
              >
                <button className="rounded-2xl text-black bg-white px-3 py-1">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
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
        <div className="flex flex-col items-baseline space-x-4 text-center w-full ">
          <Link
            href="/"
            className="hover:text-slate-50 px-10  text-white rounded-md text-base my-4 font-semibold w-full"
          >
            MEMO
          </Link>
          <Link
            href="/"
            className="hover:text-slate-50 px-10  text-white rounded-md text-base my-4 font-semibold w-full"
          >
            DOCS
          </Link>
          <Link
            href="/contact"
            className="hover:text-slate-50 px-10   rounded-md text-lg my-4 font-semibold w-full"
          >
            <button className="rounded-2xl text-black bg-white px-4 py-2">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
