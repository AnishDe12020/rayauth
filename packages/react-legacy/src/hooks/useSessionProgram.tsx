import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { useEffect, useMemo } from "react";
import { useAuth } from "./useAuth";
import { Buffer } from "buffer";

import { IDL, RayauthSession } from "../types/rayauth_session";

export const SESSION_PROGRAM_ID = "QMj41mN3j168KTuUWNrCgbSAYQ7o9QTaaSnT9gLvW9s";

export const useSessionProgram = () => {
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);

  const { user } = useAuth();

  useEffect(() => {
    window.Buffer = Buffer;
  });

  const anchorWallet = useMemo(() => {
    if (!user?.address) return;

    return {
      publicKey: new PublicKey(user.address),
      signTransaction: user.signTransaction,
      signAllTransactions: user.signAllTransactions,
    };
  }, [user]);

  const anchorProvider = useMemo(() => {
    if (!anchorWallet) return;

    return new AnchorProvider(connection, anchorWallet as any, {
      commitment: "confirmed",
    });
  }, [connection, anchorWallet]);

  console.log("anchorWallet", anchorWallet);
  console.log("anchorProvider", anchorProvider);

  const sessionProgram: Program<RayauthSession> | undefined = useMemo(() => {
    if (!anchorProvider) return;

    return new Program(IDL, SESSION_PROGRAM_ID, anchorProvider);
  }, [anchorProvider]);

  console.log("sessionProgram", sessionProgram);

  const addSessionToken = async (
    timestamp: number = Math.floor(Date.now() / 1000) + 3600
  ) => {
    if (!sessionProgram) {
      console.log("ched");
      return;
    }

    const sessionKeypair = new Keypair();
    console.log(sessionKeypair);
    const [sessionKeyPda] = await PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      sessionProgram.programId
    );

    console.log("doing tx");

    const addSessionKeyIx = await sessionProgram.methods
      .addSessionKey(new BN(timestamp))
      .accounts({
        sessionKeyPda,
        sessionKey: sessionKeypair.publicKey,
        payer: anchorWallet?.publicKey,
        user: anchorWallet?.publicKey,
      })
      .instruction();

    console.log("addSessionKeyIx", addSessionKeyIx);

    const tx = new Transaction().add(addSessionKeyIx);

    const signedTx = await user?.signTransaction(tx);

    console.log("signedTx", signedTx);

    // set the session token keypair in local storage

    localStorage.setItem("sessionToken", JSON.stringify(sessionKeypair));

    return;
  };

  const getSessionKeypair = () => {
    const sessionKeypair = localStorage.getItem("sessionToken");

    if (!sessionKeypair) return;

    return Keypair.fromSecretKey(
      Buffer.from(JSON.parse(sessionKeypair).secretKey)
    );
  };

  const revokeSessionToken = async () => {
    if (!sessionProgram) return;

    const sessionKeypair = getSessionKeypair();

    if (!sessionKeypair) return;

    const [sessionKeyPda] = await PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      sessionProgram.programId
    );

    const revokeSessionKeyTx = await sessionProgram.methods
      .revokeSessionKey()
      .accounts({
        sessionKeyPda,
        user: anchorWallet?.publicKey,
      })
      .rpc();

    console.log("revokeSessionKeyTx", revokeSessionKeyTx);
  };

  return {
    sessionProgram,
    addSessionToken,
    getSessionKeypair,
    revokeSessionToken,
  };
};
