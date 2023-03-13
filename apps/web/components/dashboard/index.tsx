import React from "react";
import { BsPlus } from "react-icons/bs";
import Image from "next/image";
import NewProjectModal from "./projects/NewProjectModal";
import { MdOutlineDelete } from "react-icons/md";
import Link from "next/link";
import router, { useRouter } from "next/router";
import withCommonEffects from "../authGuard/RouteGuard";
type Props = {};
const ProjectTable = () => {
  const data = [
    {
      id: "ebvc-abc-123",
      name: "UniSwap",
      date: "2021-09-01",
    },
    {
      id: "ebvc-abc-123",
      name: "RayAuth",
      date: "2021-09-01",
    },
    {
      id: "ebvc-abc-123",
      name: "Google",
      date: "2021-09-01",
    },
  ];
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <div>
        {data.map((item, key) => (
          <Link key={key} href={`/dashboard/${item.id}`}>
            <div className="p-4 bg-gray-800 m-2 rounded-md border border-transparent cursor-pointer hover:border-blue-900">
              <h4 className="text-white">{item.name}</h4>
            </div>
          </Link>
        ))}
      </div>
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
      <div className="mt-6">
        <ProjectTable />
      </div>
    </div>
  );
};

export default withCommonEffects(Dashboard, {
  isAuthRequired: true,
});
