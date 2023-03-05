import { atomWithStorage } from "jotai/utils";
import { Cluster } from "../types/cluster";

const clusterAtom = atomWithStorage<Cluster>("cluster", Cluster.MainnetBeta);

export default clusterAtom;
