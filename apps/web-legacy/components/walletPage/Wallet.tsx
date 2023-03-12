import React, { useEffect, useState } from "react";

import Transfer from "./Transfer";
import TopUp from "./TopUp";
import useAuth from "@/hooks/useAuth";
import useCluster from "@/hooks/useCluster";
import { Cluster } from "@/types/cluster";
import {
  GetProgramAccountsFilter,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { toast } from "sonner";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Metadata,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { truncatePubkey } from "@/utils/truncate";
import LoginRequired from "../common/LoginRequired";
import withCommonEffects from "../authGuard/RouteGuard";
type Props = {};

const AccountOption = ({ publicKey }: { publicKey: string }) => {
  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(publicKey);
    toast.success("Copied public key to clipboard");
  };

  return (
    <div className="flex flex-row items-center">
      <button
        className="px-3 py-1 text-xs border rounded-full"
        onClick={handleCopyPublicKey}
      >
        {truncatePubkey(publicKey)}
      </button>
    </div>
  );
};

const Wallet = (props: Props) => {
  const { user, publickey, signIn } = useAuth();
  const { cluster, setCluster, connection } = useCluster();

  const [solBalance, setSolBalance] = useState<number>(0);
  const [splAccounts, setSplAccounts] = useState<any[]>([]);

  useEffect(() => {
    const getWalletData = async () => {
      if (!publickey) return;

      const solBalance =
        (await connection.getBalance(publickey)) / LAMPORTS_PER_SOL;

      const filters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 32,
            bytes: publickey.toBase58(),
          },
        },
      ];
      const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        { filters: filters }
      );

      const splAccounts = await Promise.all(
        accounts.map(async (account, i) => {
          const parsedAccountInfo: any = account.account.data;
          const mintAddress: string =
            parsedAccountInfo["parsed"]["info"]["mint"];
          const tokenBalance: number =
            parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];

          const [metadataPda] = PublicKey.findProgramAddressSync(
            [
              Buffer.from("metadata"),
              TOKEN_METADATA_PROGRAM_ID.toBuffer(),
              new PublicKey(mintAddress).toBuffer(),
            ],
            TOKEN_METADATA_PROGRAM_ID
          );

          const metadataInfo = await connection.getAccountInfo(metadataPda);

          let metadata;

          if (metadataInfo?.data) {
            const meta = Metadata.deserialize(metadataInfo.data)[0];

            const metadataUri = meta.data.uri;

            const metadataResponse = await fetch(metadataUri);

            const metadataJson = await metadataResponse.json();

            metadata = { ...metadataJson, symbol: meta.data.symbol };
          }

          return {
            mintAddress,
            tokenBalance,
            metadata,
          };
        })
      );

      setSolBalance(solBalance);
      setSplAccounts(splAccounts);
    };

    getWalletData();
  }, [connection, publickey]);

  console.log("splAccounts", splAccounts);

  return (
    <div className="block max-w-2xl p-6 mx-auto my-1 font-sans border border-transparent rounded-lg shadow md:my-6">
      <div className="rounded-full absolute w-[260px] h-[500px] md:w-[483px] md:h-[461px] left-[120px] lg:left-[530px] top-[158px] bg-gradient-to-b from-gradient-1 to-gradient-2 blur-[300px] -z-10 opacity-70" />

      <div className="flex flex-col text-white ">
        {/* Header */}
        <div className="flex flex-row justify-between w-full py-6 ">
          <div>
            <h3 className="text-xl font-medium font-ksans lg:text-3xl">
              Account Balance
            </h3>
          </div>
          <div className="hidden lg:block">
            <AccountOption publicKey={`${publickey?.toString()}`} />
          </div>
        </div>
        {/* Body */}
        <div className="p-6 bg-gray-900 border border-transparent rounded-lg shadow">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-end justify-between py-6 mx-4">
              <div className="flex flex-row items-end">
                <span className="text-3xl font-bold text-gray-200">
                  {solBalance}
                </span>
                <span className="ml-2 text-xl font-bold text-gray-400">
                  SOL
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400"></span>
              </div>
            </div>
            <div>
              <span className="flex flex-row items-center text-sm font-medium text-gray-400">
                <select
                  className="block p-0 text-gray-400 bg-transparent"
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value as Cluster)}
                >
                  {/* Not live on mainnet yet */}
                  {/* <option value={Cluster.MainnetBeta}>Solana Mainnet</option> */}
                  <option value={Cluster.Devnet}>Solana Devnet</option>
                </select>
              </span>
            </div>
          </div>
          <div className="flex flex-row">
            <TopUp publicKey={`${publickey?.toBase58()}`} />
            <Transfer />
          </div>
        </div>
        <div className="flex justify-center my-4 lg:hidden">
          <AccountOption publicKey={`${publickey}`} />
        </div>
      </div>
    </div>
  );
};

export default withCommonEffects(Wallet, {
  isAuthRequired: true,
});
