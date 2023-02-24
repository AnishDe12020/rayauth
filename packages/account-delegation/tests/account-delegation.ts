import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AccountDelegation } from "../target/types/account_delegation";

import lumina from "@lumina-dev/test";
import { expect } from "chai";

lumina();

describe("account-delegation", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .AccountDelegation as Program<AccountDelegation>;
  const connection = anchor.getProvider().connection;
  const userWallet = anchor.workspace.AccountDelegation.provider.wallet;

  const project_account = anchor.web3.Keypair.generate();
  const payer = anchor.web3.Keypair.generate();

  const airdropToPayer = async () => {
    const sig = await connection.requestAirdrop(payer.publicKey, 1000000000);
    await connection.confirmTransaction(sig);
  };

  it("Creates a new delegate account", async () => {
    await airdropToPayer();

    const [delegatedAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("delegated_account"),
        project_account.publicKey.toBuffer(),
        userWallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    const createTx = await program.methods
      .createDelegatedAccount([project_account.publicKey])
      .accounts({
        delegated: delegatedAccount,
        owner: userWallet.publicKey,
        projectAccount: project_account.publicKey,
        payer: payer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([payer])
      .rpc();

    console.log("createTx: ", createTx);

    const delegatedAccountInfo = await program.account.delegatedAccount.fetch(
      delegatedAccount
    );

    expect(delegatedAccountInfo).to.not.be.null;
    expect(delegatedAccountInfo.owner.toBase58()).to.equal(
      userWallet.publicKey.toBase58()
    );
    expect(delegatedAccountInfo.projectAccount.toBase58()).to.equal(
      project_account.publicKey.toBase58()
    );
    expect(delegatedAccountInfo.delegates.length).to.equal(1);
    expect(delegatedAccountInfo.delegates[0].toBase58()).to.equal(
      project_account.publicKey.toBase58()
    );
  });
});
