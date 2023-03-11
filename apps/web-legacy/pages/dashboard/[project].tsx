import ProjectPage from "@/components/dashboard/projects/ProjectPage";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

type Props = {};

const Project = (props: Props) => {
  return <ProjectPage />;
};

Project.PageLayout = DashboardLayout;

export default Project;
