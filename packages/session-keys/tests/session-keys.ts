import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import lumina from "@lumina-dev/test";

import { SessionKeys } from "../target/types/session_keys";

lumina();

describe("session-keys", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SessionKeys as Program<SessionKeys>;
  const userWallet = anchor.workspace.SessionKeys.provider.wallet;

  const userKeypair = anchor.web3.Keypair.generate();

  const sessionKeypair = anchor.web3.Keypair.generate();

  it("creates session key pda", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const timestamp_after_1_hour = Math.floor(Date.now() / 1000) + 3600;

    const tx = await program.methods
      .addSessionKey(
        sessionKeypair.publicKey,
        new anchor.BN(timestamp_after_1_hour)
      )
      .accounts({
        payer: userWallet.publicKey,
        sessionKeyPda: sessionKeyPda,
        user: userKeypair.publicKey,
      })
      .signers([userKeypair])
      .rpc();

    console.log("tx", tx);

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
});
