import React, { useEffect, useState } from "react";
import WalletLayout from "@/components/layouts/WalletLayout";
import { useRouter } from "next/router";
import useCluster from "@/hooks/useCluster";
import bs58 from "bs58";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";

import secret from "secret-sharing.js";
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

    // const {
    //   data: { key },
    // } = await axios.get(`${BACKEND_URL}/private-key`, {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // });

    const key =
      "8022afb34310db9b60fdac9942ac710290bd7e70d463993137e4aa4e6d11b76a457ed49e5e52ff9e193e66af10d6b3a2001d5450b17469c399c7f4ec5697f9689a351daece0233882ecd5cede0caf1863e2c0eb321531863a29fa3d12de4d855d672586491c57fa0fe9ee871b45c21901b28d7c653b0adb261e8852db57b360a0662b24735ba847266dfa65d206af62886d526caa2423d24d737312d106a48ceac578f4d75253888df37a5abbaa76056a9086c5ccaa964cba15540b3646eecec008";

    console.log("shares", deviceShare, key);

    const privKeyHex = secret.combine([key, deviceShare], 4);

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
