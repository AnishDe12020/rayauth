import * as anchor from "@project-serum/anchor";

export const createBlankTransaction = async (
  connection: anchor.web3.Connection,
  feePayer: anchor.web3.PublicKey
) => {
  const { blockhash } = await connection.getLatestBlockhash();
  const lastValidBlockHeight = await connection.getBlockHeight();

  return new anchor.web3.Transaction({
    blockhash,
    lastValidBlockHeight,
    feePayer,
  });
};

export const createTestTransferInstruction = (
  authority: anchor.web3.PublicKey,
  recipient: anchor.web3.PublicKey,
  amount = 1000000
) => {
  console.log("authority: ", authority.toBase58());
  console.log("recipient: ", recipient.toBase58());

  return anchor.web3.SystemProgram.transfer({
    fromPubkey: authority,
    lamports: amount,
    toPubkey: recipient,
  });
};
