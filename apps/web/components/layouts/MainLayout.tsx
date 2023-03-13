import React from "react";
import clsx from "clsx";
import Navbar from "../common/Navbar";

const MainLayout = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={clsx(
        "mx-auto text-white max-w-screen-2xl flex flex-col justify-between h-screen",
        className
      )}
    >
      <div>
        <Navbar />
        {children}
      </div>
      <div
        style={{
          background: "linear-gradient(90deg, #45A0F5 0%, #26E3C2 100%)",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fill: "transparent",
        }}
        className="h-2 bg-white"
      ></div>
    </main>
  );
};

export default MainLayout;
