import { getRpc } from "@/utils/cluster";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { Connection } from "@solana/web3.js";
import clusterAtom from "../store/cluster";

const useCluster = () => {
  const [cluster, setCluster] = useAtom(clusterAtom);

  const rpc = useMemo(() => getRpc(cluster), [cluster]);

  const connection = useMemo(() => new Connection(rpc), [rpc]);

  return {
    cluster,
    setCluster,
    rpc,
    connection,
  };
};

export default useCluster;
