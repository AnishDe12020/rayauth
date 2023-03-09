import React from "react";
import { BsPlus } from "react-icons/bs";
import Image from "next/image";
import NewProjectModal from "./projects/NewProjectModal";
import { MdOutlineDelete } from "react-icons/md";
import Link from "next/link";
import router, { useRouter } from "next/router";

type Props = {};
const ProjectTable = () => {
  const data = [
    {
      id: 1,
      name: "UniSwap",
      description: "A decentralized exchange",
      url: "https://uniswap.org/",
      image:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      category: "Exchange",
    },
    {
      id: 2,
      name: "RayAuth",
      description: "A decentralized authentication system",
      url: "https://rayauth.com/",
      image:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      category: "Authentication",
    },
    {
      id: 3,
      name: "Google",
      description: "A search engine",
      url: "https://google.com/",
      image:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      category: "Search Engine",
    },
  ];
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-slate-300 uppercase bg-gray-900 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              About
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Logo
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">
                <MdOutlineDelete />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr
                key={key}
                onClick={() => {
                  router.push(`/dashboard/${item.id}`);
                }}
                className="bg-gray-800 border-b border-slate-400 text-slate-200  hover:bg-gray-600 hover:cursor-pointer"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-200 whitespace-nowrap "
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">
                  <img
                    width="50"
                    height="50"
                    alt={`${item.name}`}
                    src={`${item.image}`}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="rounded-full font-extrabold text-white text-xl  hover:text-red-400">
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const Dashboard = (props: Props) => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <h2 className="text-white text-2xl font-ksans  font-semibold text-left">
          Project
        </h2>

        <NewProjectModal />
      </div>
      <div className="p-3 mt-8 -z-10 relative">
        <ProjectTable />
      </div>
    </div>
  );
};

export default Dashboard;
