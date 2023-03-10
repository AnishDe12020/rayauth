import React, { useEffect, useState } from "react";
import WalletLayout from "@/components/layouts/WalletLayout";
import { useRouter } from "next/router";
import useCluster from "@/hooks/useCluster";
import bs58 from "bs58";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";

import { Keypair } from "@solana/web3.js";
import Button from "@/components/common/Button";

const Wallet = () => {
  const router = useRouter();

  const { jwt } = useAuth();

  const { deviceShare } = useDeviceShare();

  const handleSignTransaction = async () => {
    const transaction = router.query.tx as string;
    const transactionBytes = bs58.decode(transaction);
    const transactionBuffer = Buffer.from(transactionBytes);

    const {
      data: { key },
    } = await axios.get(`${BACKEND_URL}/private-key`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("shares", deviceShare, key);

    const privKeyHex = secrets.combine([key, deviceShare], 1);

    const privKey = bs58.encode(Buffer.from(privKeyHex, "hex"));

    console.log(privKey);

    const keypair = Keypair.fromSecretKey(bs58.decode(privKey));

    console.log(keypair);
  };

  return (
    <div className="flex-col items-center justify-center block max-w-2xl p-6 mx-auto my-1 font-sans text-white border border-transparent rounded-lg shadow md:my-6">
      <h1 className="text-4xl font-bold text-center">Approve Transaction</h1>

      <Button onClick={handleSignTransaction}>Approve</Button>
    </div>
  );
};

Wallet.PageLayout = WalletLayout;

export default Wallet;
