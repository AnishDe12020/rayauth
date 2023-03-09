import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import lumina from "@lumina-dev/test";

import { RayauthSession } from "../target/types/rayauth_session";
import { DummyProgram } from "../target/types/dummy_program";

lumina();

describe("session-keys", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.RayauthSession as Program<RayauthSession>;
  const testProgram = anchor.workspace.DummyProgram as Program<DummyProgram>;
  const userWallet = anchor.workspace.SessionKeys.provider.wallet;

  const userKeypair = anchor.web3.Keypair.generate();

  const sessionKeypair = anchor.web3.Keypair.generate();

  it("creates session key pda", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const timestamp_after_1_hour = Math.floor(Date.now() / 1000) + 3600;

    const addTx = await program.methods
      .addSessionKey(new anchor.BN(timestamp_after_1_hour))
      .accounts({
        payer: userWallet.publicKey,
        sessionKeyPda: sessionKeyPda,
        user: userKeypair.publicKey,
        sessionKey: sessionKeypair.publicKey,
      })
      .signers([userKeypair, sessionKeypair])
      .rpc();

    console.log("addTx: ", addTx);

    const sessionKeyAccount = await program.account.sessionKey.fetch(
      sessionKeyPda
    );

    expect(sessionKeyAccount.user.toBase58()).to.equal(
      userKeypair.publicKey.toBase58()
    );
    expect(sessionKeyAccount.sessionKey.toBase58()).to.equal(
      sessionKeypair.publicKey.toBase58()
    );
    expect(sessionKeyAccount.expiresAt.toNumber()).to.equal(
      timestamp_after_1_hour
    );
  });

  it("can call dummy program with session key", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const [dummyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("dummy"), userKeypair.publicKey.toBuffer()],
      testProgram.programId
    );

    const dummyTx = await testProgram.methods
      .executeDummyInstruction(1)
      .accounts({
        owner: sessionKeyPda,
        payer: userWallet.publicKey,
        pda: dummyPda,
      })
      .rpc();

    console.log("dummyTx: ", dummyTx);
  });

  it("can revoke a session key", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const revokeTx = await program.methods
      .revokeSessionKey()
      .accounts({
        sessionKeyPda: sessionKeyPda,
        user: userKeypair.publicKey,
      })
      .rpc();

    console.log("revokeTx: ", revokeTx);

    const sessionKeyAccount = await program.account.sessionKey
      .fetch(sessionKeyPda)
      .catch((err) => {
        expect(err).to.not.be.undefined;
        expect(err.message).to.contain("Account does not exist");
      });
  });
});
