import { Cluster } from "@/types/cluster";

export const getRpc = (cluster: string) => {
  switch (cluster) {
    case Cluster.MainnetBeta:
      return (
        process.env.NEXT_PUBLIC_MAINNET_RPC ??
        "https://api.mainnet-beta.solana.com"
      );

    case Cluster.Devnet:
      return (
        process.env.NEXT_PUBLIC_DEVNET_RPC ?? "https://api.devnet.solana.com"
      );

    default:
      return (
        process.env.NEXT_PUBLIC_DEVNET_RPC ?? "https://api.devnet.solana.com"
      );
  }
};
