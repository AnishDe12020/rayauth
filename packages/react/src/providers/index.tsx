import { store } from "../store";
import { createContext } from "../helpers/context";
import { config } from "../interfaces";
import React, { useEffect } from "react";
import { handleWallet } from "../helpers/handleWallet";
const [RayAuthConfigProvider, useConfig] = createContext<config>();
export { useConfig };

export const RayAuthProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: config;
}) => {
  const state:any = store()
  console.log("state",state.count)
  useEffect(() => {
    handleWallet();
  }, [])
  return (
    <RayAuthConfigProvider value={config}>
      <div hidden={Boolean(state.isVisible)} className="">
       <iframe height={650} width={400} src={state.src}></iframe>
      </div>
      {children}
    </RayAuthConfigProvider>
  );
};
