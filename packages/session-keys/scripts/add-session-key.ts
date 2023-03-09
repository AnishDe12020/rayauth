import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SessionKeys } from "../target/types/session_keys";

const main = async () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const userWallet = anchor.web3.Keypair.generate();

  const program = anchor.workspace.SessionKeys as Program<SessionKeys>;

  const timestampAfter1Hour = Math.floor(Date.now() / 1000) + 3600;

  const connection = anchor.getProvider().connection;

  const sessionKeypair = anchor.web3.Keypair.generate();

  // write the keypair to a file so we can use it in the next script
  const fs = require("fs");

  fs.writeFile(
    "user-keypair.json",
    JSON.stringify(userWallet.secretKey.toString()),
    function (err) {
      if (err) {
        return console.log("err saving file", err);
      }
    }
  );

  fs.writeFile(
    "session-keypair.json",
    JSON.stringify(sessionKeypair.secretKey.toString()),
    function (err) {
      if (err) {
        return console.log("err saving file", err);
      }
    }
  );

  const sessionKeypairAirdropSig = await connection.requestAirdrop(
    sessionKeypair.publicKey,
    1000000000
  );

  await connection.confirmTransaction(sessionKeypairAirdropSig);

  const userKeypairAirdropSig = await connection.requestAirdrop(
    userWallet.publicKey,
    1000000000
  );

  await connection.confirmTransaction(userKeypairAirdropSig);

  const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
    [sessionKeypair.publicKey.toBuffer()],
    program.programId
  );

  const addTx = await program.methods
    .addSessionKey(new anchor.BN(timestampAfter1Hour))
    .accounts({
      payer: userWallet.publicKey,
      sessionKey: sessionKeypair.publicKey,
      user: userWallet.publicKey,
      sessionKeyPda: sessionKeyPda,
    })
    .signers([userWallet, sessionKeypair])
    .rpc();

  console.log("addTx: ", addTx);
};

main()
  .then(() => console.log("Success"))
  .catch((e) => console.error(e));
