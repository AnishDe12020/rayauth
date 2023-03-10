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
    handleWallet(state);
  }, [])
  return (
    <RayAuthConfigProvider value={config}>
      <div hidden={Boolean(state.isHidden)}>
       <iframe height={1000} width={800} src={state.src}></iframe>
      </div>
      <div hidden={Boolean(!state.isHidden)}> 
      {children}
      </div>
    </RayAuthConfigProvider>
  );
};
