import { createContext } from "../helpers/context";
import { config } from "../interfaces";
import React from "react";
const [RayAuthConfigProvider, useConfig] = createContext<config>();

export { useConfig };

export const RayAuthProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: config;
}) => {
  return (
    <RayAuthConfigProvider value={config}>{children}</RayAuthConfigProvider>
  );
};
