import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AccountDelegation } from "../target/types/account_delegation";

import lumina from "@lumina-dev/test";
import { expect } from "chai";
import { createTestTransferInstruction } from "./utils";

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

  const newDelegate = anchor.web3.Keypair.generate();

  const airdropToPayer = async () => {
    const sig = await connection.requestAirdrop(payer.publicKey, 1000000000);
    await connection.confirmTransaction(sig);
  };

  it("creates a new delegated account", async () => {
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

  it("can add a new delegate", async () => {
    const [delegatedAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("delegated_account"),
        project_account.publicKey.toBuffer(),
        userWallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    const currentDelegateAccount = await program.account.delegatedAccount.fetch(
      delegatedAccount
    );

    const currentDelegateAccountInfo = await connection.getAccountInfo(
      delegatedAccount
    );

    const currentDelegatesLength = currentDelegateAccount.delegates.length;
    const currentRentLamports = currentDelegateAccountInfo.lamports;

    const currentDataSize = currentDelegateAccountInfo.data.length;

    const SIZE_WITHOUT_DELEGATES = 8 + 32 + 32 + 4;

    const spotsLeft =
      (currentDataSize - SIZE_WITHOUT_DELEGATES) / 32 - currentDelegatesLength;

    let topUpIx: anchor.web3.TransactionInstruction | undefined;

    if (spotsLeft < 1) {
      const neededLen = currentDataSize + 32;

      const rentExemptLamports =
        await connection.getMinimumBalanceForRentExemption(neededLen);

      const topupLamports = rentExemptLamports - currentRentLamports;

      if (topupLamports > 0) {
        topUpIx = createTestTransferInstruction(
          payer.publicKey,
          delegatedAccount,
          topupLamports
        );
      }
    }

    const addDelegateTx = await program.methods
      .addDelegate(newDelegate.publicKey)
      .accounts({
        delegated: delegatedAccount,
        owner: userWallet.publicKey,
        payer: payer.publicKey,
        projectAccount: project_account.publicKey,
      })
      .signers([payer])
      .preInstructions([topUpIx])
      .rpc();

    console.log("addDelegateTx: ", addDelegateTx);

    const delegatedAccountInfo = await program.account.delegatedAccount.fetch(
      delegatedAccount
    );

    expect(delegatedAccountInfo.delegates.length).to.equal(2);
    expect(delegatedAccountInfo.delegates[0].toBase58()).to.equal(
      project_account.publicKey.toBase58()
    );
    expect(delegatedAccountInfo.delegates[1].toBase58()).to.equal(
      newDelegate.publicKey.toBase58()
    );
  });

  it("can remove a delegate", async () => {
    const [delegatedAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("delegated_account"),
        project_account.publicKey.toBuffer(),
        userWallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    const removeDelegateTx = await program.methods
      .removeDelegate(newDelegate.publicKey)
      .accounts({
        delegated: delegatedAccount,
        owner: userWallet.publicKey,
        payer: payer.publicKey,
        projectAccount: project_account.publicKey,
      })
      .signers([payer])
      .rpc();

    console.log("removeDelegateTx: ", removeDelegateTx);

    const delegatedAccountInfo = await program.account.delegatedAccount.fetch(
      delegatedAccount
    );

    expect(delegatedAccountInfo.delegates.length).to.equal(1);
    expect(delegatedAccountInfo.delegates[0].toBase58()).to.equal(
      project_account.publicKey.toBase58()
    );
  });
});
