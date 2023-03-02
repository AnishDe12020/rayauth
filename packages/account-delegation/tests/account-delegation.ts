import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AccountDelegation } from "../target/types/account_delegation";
import { DummyProgram } from "../target/types/dummy_program";

import lumina from "@lumina-dev/test";
import { expect } from "chai";
import { createTestTransferInstruction } from "./utils";

lumina();

describe("account-delegation", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .AccountDelegation as Program<AccountDelegation>;
  const dummyProgram = anchor.workspace.DummyProgram as Program<DummyProgram>;

  const connection = anchor.getProvider().connection;
  const userWallet = anchor.workspace.AccountDelegation.provider.wallet;

  const project_account = anchor.web3.Keypair.generate();
  const payer = anchor.web3.Keypair.generate();

  const newDelegate = anchor.web3.Keypair.generate();

  const airdropTo = async (pubkey: anchor.web3.PublicKey) => {
    const sig = await connection.requestAirdrop(pubkey, 1000000000);
    await connection.confirmTransaction(sig);
  };

  it("creates a new delegated account", async () => {
    await airdropTo(payer.publicKey);

    const [delegatedAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("delegated_account"),
        project_account.publicKey.toBuffer(),
        userWallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    const ixEncoded = program.coder.instruction.encode(
      "createDelegatedAccount",
      program.methods
        .createDelegatedAccount([project_account.publicKey])
        .accounts({
          delegated: delegatedAccount,
          owner: userWallet.publicKey,
          projectAccount: project_account.publicKey,
          payer: payer.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([payer])
        .instruction()
    );

    console.log(ixEncoded);

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

  // it("can execute dummy instruction", async () => {
  //   const [dummyPda] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("dummy")],
  //     dummyProgram.programId
  //   );

  //   const [delegatedAccount] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [
  //       Buffer.from("delegated_account"),
  //       project_account.publicKey.toBuffer(),
  //       userWallet.publicKey.toBuffer(),
  //     ],
  //     program.programId
  //   );

  //   const dummyTx = await dummyProgram.methods
  //     .executeDummyInstruction(1)
  //     .accounts({
  //       payer: payer.publicKey,
  //       pda: dummyPda,
  //     })
  //     .signers([payer])
  //     .rpc();

  //   console.log("dummyTx: ", dummyTx);
  // });

  it("can execute a transaction", async () => {
    airdropTo(project_account.publicKey);

    const [delegatedAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("delegated_account"),
        project_account.publicKey.toBuffer(),
        userWallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    const [dummyPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("dummy")],
      dummyProgram.programId
    );

    console.log("userWallet: ", userWallet.publicKey.toBase58());
    console.log("project_account: ", project_account.publicKey.toBase58());
    console.log("delegatedAccount: ", delegatedAccount.toBase58());
    console.log("payer: ", payer.publicKey.toBase58());
    console.log("dummyPda: ", dummyPda.toBase58());

    const ix = await dummyProgram.methods
      .executeDummyInstruction(1)
      .accounts({
        payer: project_account.publicKey,
        pda: dummyPda,
        owner: delegatedAccount,
      })
      .instruction();

    console.log("ix.programId.toBase58()", ix.programId.toBase58());

    const modifyComputeUnits =
      anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 1000000,
      });

    const executeTx = await program.methods
      .executeTransaction({
        instructions: [
          {
            programId: ix.programId,
            accounts: ix.keys,
            data: ix.data,
            index: 1,
          },
        ],
      })
      .accounts({
        delegated: delegatedAccount,
        owner: userWallet.publicKey,
        payer: project_account.publicKey,
        projectAccount: project_account.publicKey,
      })
      .remainingAccounts([
        {
          pubkey: dummyProgram.programId,
          isSigner: false,
          isWritable: false,
        },
        { pubkey: delegatedAccount, isSigner: false, isWritable: true },
        { pubkey: project_account.publicKey, isSigner: true, isWritable: true },
        { pubkey: dummyPda, isSigner: false, isWritable: true },
        {
          pubkey: anchor.web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
      ])
      .preInstructions([modifyComputeUnits])
      .signers([project_account])
      .rpc();

    console.log("executeTx: ", executeTx);

    // const dummyAccountInfo = await program.account.dummyPda.fetch(dummyPda);

    // console.log(dummyAccountInfo);

    // expect(dummyAccountInfo).to.not.be.null;
    // expect(dummyAccountInfo.data).to.equal(1);
  });
});
