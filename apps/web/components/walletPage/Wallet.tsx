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

type Props = {};

const AccountOption = ({ publicKey }: { publicKey: PublicKey }) => {
  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(publicKey.toString());
    toast.success("Copied public key to clipboard");
  };

  return (
    <div className="flex flex-row items-center">
      <button
        className="block p-1 px-2 mx-2 text-xs border rounded-full w-28 lg:p-2"
        onClick={handleCopyPublicKey}
      >
        {truncatePubkey(publicKey.toString())}
      </button>
    </div>
  );
};

const Wallet = (props: Props) => {
  const { user, publickey } = useAuth();
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

  return publickey ? (
    <div className="block max-w-2xl p-6 mx-auto my-1 border border-transparent rounded-lg shadow md:my-6 font-ksans">
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
            <AccountOption publicKey={publickey} />
          </div>
        </div>
        {/* Body */}
        <div className="p-6 border border-transparent rounded-lg shadow bg-slate-900">
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
            <TopUp publicKey={publickey.toBase58()} />
            <Transfer />
          </div>
        </div>
        <div className="flex justify-center my-4 lg:hidden">
          <AccountOption publicKey={publickey} />
        </div>
        <div className="flex flex-col py-4 space-y-8">
          <div className="my-4">
            <h2 className="font-medium">SPL Tokens</h2>
          </div>
          {splAccounts.map((account, i) => (
            <div
              className="flex flex-col p-3 border border-transparent rounded-lg shadow bg-slate-900"
              key={i}
            >
              <div className="my-2">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center space-x-2">
                    <img
                      src={
                        account?.metadata?.image ||
                        "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M24%2012C24%2018.6274%2018.6274%2024%2012%2024C5.37258%2024%200%2018.6274%200%2012C0%205.37258%205.37258%200%2012%200C18.6274%200%2024%205.37258%2024%2012ZM10.9645%2015.3015C10.9645%2015.7984%2011.3677%2016.2015%2011.8645%2016.2015C12.3612%2016.2015%2012.7645%2015.7984%2012.7645%2015.3015C12.7645%2014.8047%2012.3612%2014.4015%2011.8645%2014.4015C11.3677%2014.4015%2010.9645%2014.8047%2010.9645%2015.3015ZM13.3939%2011.8791C13.9135%2011.5085%2014.2656%2011.1748%2014.4511%2010.8777C14.8776%2010.1948%2014.8728%209.02088%2014.0532%208.35291C12.9367%207.44383%2010.8943%207.77224%209.6001%208.49763L10.2067%209.7155C10.9189%209.35193%2011.553%209.17%2012.1092%209.17C12.6546%209.17%2013.1214%209.36453%2013.1214%209.91004C13.1214%2010.4891%2012.6543%2010.8231%2012.1713%2011.1684L12.171%2011.1686L12.1645%2011.173C11.9915%2011.2996%2011.8416%2011.4235%2011.7147%2011.5442C11.5451%2011.7059%2011.4168%2011.8621%2011.3298%2012.013C11.1013%2012.4085%2011.1014%2012.736%2011.1019%2013.152V13.2015H12.5761L12.576%2013.158C12.5755%2012.6312%2012.5753%2012.4844%2013.3939%2011.8791ZM20.5%2012C20.5%2016.6944%2016.6944%2020.5%2012%2020.5C7.30558%2020.5%203.5%2016.6944%203.5%2012C3.5%207.30558%207.30558%203.5%2012%203.5C16.6944%203.5%2020.5%207.30558%2020.5%2012ZM22%2012C22%2017.5228%2017.5228%2022%2012%2022C6.47715%2022%202%2017.5228%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012Z'%20fill='%238F929E'/%3E%3C/svg%3E"
                      }
                      alt={account?.metadata?.name || "Unknown token"}
                      className="w-6 h-6 mr-2 rounded-full"
                    />

                    <h3 className="text-sm font-bold">
                      {account?.metadata?.name || "Unknown token"}
                    </h3>
                  </div>
                  <p>
                    {account.tokenBalance}{" "}
                    {account?.metadata?.symbol.replace(/\0.*$/, "") || "UNKN"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>login first lol</p>
  );
};

export default Wallet;
