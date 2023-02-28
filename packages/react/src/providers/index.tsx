import { createContext } from "../helpers/context";
import { config } from "../interfaces";

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
