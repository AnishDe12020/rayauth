import React from "react";
import Navbar from "../common/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-w-screen-2xl mx-auto">
      <Navbar />
      {children}
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
