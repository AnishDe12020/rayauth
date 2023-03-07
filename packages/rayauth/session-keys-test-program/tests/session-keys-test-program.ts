import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SessionKeysTestProgram } from "../target/types/session_keys_test_program";

describe("session-keys-test-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SessionKeysTestProgram as Program<SessionKeysTestProgram>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
