import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import lumina from "@lumina-dev/test";

import { RayauthSession } from "../target/types/rayauth_session";
import { DappHunt } from "../target/types/dapp_hunt";

lumina();

describe("session-keys", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.RayauthSession as Program<RayauthSession>;
  const dappHuntProgram = anchor.workspace.DappHunt as Program<DappHunt>;
  const userWallet = anchor.workspace.RayauthSession.provider.wallet;

  const userKeypair = anchor.web3.Keypair.generate();

  const sessionKeypair = anchor.web3.Keypair.generate();

  const connection = anchor.getProvider().connection;

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

    console.log("addTx", addTx);

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

  it("can post a new post a new product", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const productName = "rayauth";
    const makerTwitter = "https://twitter.com/AnishDe12020";
    const twitterUrl = "https://twitter.com/RayAuthHQ";
    const websiteUrl = "https://rayauth.com";
    const logoUrl = "https://rayauth.com/logo.svg";
    const description = "Rayauth is a session keys solution for Solana";

    const [productPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    const productTx = await dappHuntProgram.methods
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
        payer: userWallet.publicKey,
        product: productPda,
      })
      .rpc();

    console.log("createProdcutTx: ", productTx);
  });

  it("can upvote a product", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const productName = "rayauth";

    const [productPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    const [upvotePda] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("upvote"),
        Buffer.from(productName),
        userKeypair.publicKey.toBuffer(),
      ],
      dappHuntProgram.programId
    );

    const upvoteTx = await dappHuntProgram.methods
      .upvoteProduct()
      .accounts({
        payer: userWallet.publicKey,
        product: productPda,
        voterSigner: sessionKeyPda,
        upvoteAccount: upvotePda,
      })
      .rpc();

    console.log("upvoteTx: ", upvoteTx);
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

    await program.account.sessionKey.fetch(sessionKeyPda).catch((err) => {
      expect(err).to.not.be.undefined;
      expect(err.message).to.contain("Account does not exist");
    });
  });

  it("cannot post a product if session key is revoked", async () => {
    const [sessionKeyPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      program.programId
    );

    const productName = "rayauthnew";
    const makerTwitter = "https://twitter.com/AnishDe12020";
    const twitterUrl = "https://twitter.com/RayAuthHQ";
    const websiteUrl = "https://rayauth.com";
    const logoUrl = "https://rayauth.com/logo.svg";
    const description = "Rayauth is a session keys solution for Solana";

    const [productPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    await dappHuntProgram.methods
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
        payer: userWallet.publicKey,
        product: productPda,
      })
      .rpc()
      .catch((err) => {
        expect(err).to.not.be.undefined;
      });
  });
});
