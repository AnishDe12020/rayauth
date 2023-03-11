import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineProject } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import Navbar from "../common/Navbar";
import Socials from "../common/Socials";

type Props = {};
const SideBarLinks = [
  {
    name: "Projects",
    icon: <AiOutlineProject />,
    href: "/dashboard",
  },
  {
    name: "Account",
    icon: <MdAccountCircle />,
    href: "/dashboard/account",
  },
];
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const router = useRouter();
  const currentRoute = router.pathname;
  console.log(currentRoute);
  return (
    <div className="w-full h-full ">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] md:left-[650px] top-[158px] md:top-[100px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />
      <div className="w-full border-b-[1px]">
        <Navbar />
      </div>

      <div className="w-full h-full overflow-auto">
        <div className="flex flex-no-wrap">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen
                ? "transition duration-150 translate-x-0"
                : "transition duration-150 -translate-x-full "
            } w-full md:w-96 sm:w-full absolute sm:relative bg-gray-900 md:bg-transparent border-r-[1px] border-gray-700 shadow md:h-full flex-col justify-between  sm:flex min-h-screen`}
          >
            <div>
              <div className="h-16 w-full flex items-center justify-center text-white">
                <Link href={"/"}>
                  <h2 className="text-2xl font-ksans font-bold">RayAuth</h2>
                </Link>
              </div>
              <ul className="mt-12">
                {SideBarLinks.map((link, key) => (
                  <li
                    key={key}
                    className={`${
                      link.href == currentRoute
                        ? "bg-gray-800 border-r-blue-600 text-blue-600"
                        : ""
                    } border-r-[2px] hover:border-r-blue-600 flex w-full border border-x-0 border-gray-900  py-4 items-center justify-center text-gray-300  hover:text-blue-500 cursor-pointer font-ksans`}
                  >
                    <Link href={link.href} className="flex items-center  ">
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-base ml-2 font-semibold">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Socials />
            </div>
          </div>
          {/* Buttons */}
          <div
            className="-translate-x-64 w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out"
            id="mobile-nav"
          >
            <button
              aria-label="toggle sidebar"
              id="openSideBar"
              className={` h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800  ${
                sidebarOpen ? "hidden -translate-x-64" : "translate-x-0 "
              }`}
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-adjustments"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FFFFFF"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="6" cy="10" r="2" />
                <line x1="6" y1="4" x2="6" y2="8" />
                <line x1="6" y1="12" x2="6" y2="20" />
                <circle cx="12" cy="16" r="2" />
                <line x1="12" y1="4" x2="12" y2="14" />
                <line x1="12" y1="18" x2="12" y2="20" />
                <circle cx="18" cy="7" r="2" />
                <line x1="18" y1="4" x2="18" y2="5" />
                <line x1="18" y1="9" x2="18" y2="20" />
              </svg>
            </button>
            <button
              aria-label="Close sidebar"
              id="closeSideBar"
              className={`${
                sidebarOpen ? "translate-x-0" : "hidden -translate-x-64"
              } h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white`}
              // onclick="sidebarHandler(false)"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {/* Children */}
          <div className="max-h-screen container mx-auto py-5 px-2 md:py-10 md:px-6 h-full overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
