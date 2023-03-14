import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import { Buffer } from "buffer";

import { IDL, DappHunt } from "../types/dapp_hunt";
import useAuth from "./useAuth";
import useTxModal from "./useTxModal";
import { useSessionProgram } from "./useSessionProgram";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import base58 from "bs58";
import { toast } from "sonner";
import { useQueries, useQuery, useQueryClient } from "react-query";

export const DAPP_HUNT_PROGRAM_ID =
  "8JajHSCMD6p7XoPLe8sMCM6x41sURpT1WZT4JcA3Ffsc";
export const GASLESS_PUBKEY = new PublicKey(
  "ChQHQyZ2DAeEvwHCokUUC1v7jJ1ahK2b6iLbxXpXPh2y"
);

export const useDappHuntProgram = () => {
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);
  const { user } = useAuth();
  const { signTransaction, signAllTransactions } = useTxModal();

  const { sessionKeypair, sessionProgram } = useSessionProgram();

  const [isPostingProduct, setIsPostingProduct] = useState(false);

  useEffect(() => {
    window.Buffer = Buffer;
  }, []);

  const queryClient = useQueryClient();

  const anchorWallet = useMemo(() => {
    if (!user?.address) return;
    return {
      publicKey: new PublicKey(user.address),
      signTransaction: signTransaction,
      signAllTransactions: signAllTransactions,
    };
  }, [user]);

  const anchorProvider = useMemo(() => {
    if (!anchorWallet) return;

    return new AnchorProvider(connection, anchorWallet as any, {
      commitment: "confirmed",
    });
  }, [connection, anchorWallet]);

  const dappHuntProgram: Program<DappHunt> | undefined = useMemo(() => {
    if (!anchorProvider) return;

    return new Program(IDL, DAPP_HUNT_PROGRAM_ID, anchorProvider);
  }, [anchorProvider]);

  const { data: dapps } = useQuery(
    "dapps",
    async () => {
      const dapps = await dappHuntProgram?.account.product.all();

      return dapps;
    },
    {
      enabled: !!dappHuntProgram,
    }
  );

  const postNewProduct = async (
    productName: string,
    makerTwitter: string,
    twitterUrl: string,
    websiteUrl: string,
    logoUrl: string,
    description: string
  ) => {
    if (!sessionKeypair) {
      throw new Error("No session keypair");
    }

    if (!dappHuntProgram) {
      throw new Error("No dapp hunt program");
    }

    if (!sessionProgram) {
      throw new Error("No session program");
    }

    setIsPostingProduct(true);

    const [sessionKeyPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      sessionProgram.programId
    );

    const [productPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    const productIx = await dappHuntProgram.methods
      .createProduct(
        makerTwitter,
        productName,
        description,
        logoUrl,
        websiteUrl,
        twitterUrl
      )
      .accounts({
        hunterSigner: sessionKeyPda,
        payer: GASLESS_PUBKEY,
        product: productPda,
        signer: sessionKeypair.publicKey,
      })
      .instruction();

    console.log("productIx", productIx);

    const tx = new Transaction({
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      feePayer: GASLESS_PUBKEY,
    }).add(productIx);

    tx.partialSign(sessionKeypair);

    const {
      data: { txid },
    } = await axios.post(`${BACKEND_URL}/gasless`, {
      transaction: base58.encode(tx.serialize({ requireAllSignatures: false })),
    });

    toast.success("Product hunted successfully", {
      action: {
        label: "Explorer",
        onClick: () =>
          window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`),
      },
    });

    await queryClient.refetchQueries("dapps");

    setIsPostingProduct(false);

    return;
  };

  const upvoteProduct = async (productName: string) => {
    if (!sessionKeypair) {
      throw new Error("No session keypair");
    }

    if (!dappHuntProgram) {
      throw new Error("No dapp hunt program");
    }

    if (!sessionProgram) {
      throw new Error("No session program");
    }

    if (!anchorWallet) {
      throw new Error("No anchor wallet");
    }

    const [sessionKeyPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      sessionProgram.programId
    );

    const [productPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    const [upvotePda] = await PublicKey.findProgramAddress(
      [
        Buffer.from("upvote"),
        Buffer.from(productName),
        anchorWallet?.publicKey.toBuffer(),
      ],
      dappHuntProgram.programId
    );

    const upvoteIx = await dappHuntProgram.methods
      .upvoteProduct()
      .accounts({
        payer: GASLESS_PUBKEY,
        product: productPda,
        voterSigner: sessionKeyPda,
        signer: sessionKeypair.publicKey,
        upvoteAccount: upvotePda,
      })
      .instruction();

    const tx = new Transaction({
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      feePayer: GASLESS_PUBKEY,
    }).add(upvoteIx);

    tx.partialSign(sessionKeypair);

    const {
      data: { txid },
    } = await axios.post(`${BACKEND_URL}/gasless`, {
      transaction: base58.encode(tx.serialize({ requireAllSignatures: false })),
    });

    toast.success("Product upvoted successfully", {
      action: {
        label: "Explorer",
        onClick: () =>
          window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`),
      },
    });
  };

  const didUpvote = async (productName: string) => {
    if (!anchorWallet) {
      throw new Error("No anchor wallet");
    }

    if (!dappHuntProgram) {
      throw new Error("No dapp hunt program");
    }

    const upvotedProducts = await dappHuntProgram.account.upvoteAaccount.all();

    const upvotedByUser = upvotedProducts.filter(
      (upvote) =>
        upvote.account.voter.toBase58() === anchorWallet.publicKey.toBase58()
    );

    const upvotedProduct = upvotedByUser.find(
      (upvote) => upvote.account.name === productName
    );

    return !!upvotedProduct;
  };

  return {
    dappHuntProgram,
    postNewProduct,
    upvoteProduct,
    dapps,
    isPostingProduct,
  };
};
