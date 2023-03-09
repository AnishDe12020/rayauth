import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

type Props = {};

const Project = (props: Props) => {
  return (
    <div className="p-4 mt-6">
      <div className="w-fit">
        <h1 className="text-2xl font-semibold text-white">Project Name</h1>
        <div className="w-fit my-5">
          <h4 className=" text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            minus corrupti libero repudiandae quaerat.
          </h4>
        </div>
      </div>
    </div>
  );
};

Project.PageLayout = DashboardLayout;

export default Project;
