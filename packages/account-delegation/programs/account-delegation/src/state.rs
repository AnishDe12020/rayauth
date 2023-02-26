use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct DelegatedAccount {
    pub owner: Pubkey,           // owner of the account
    pub project_account: Pubkey, // project account
    pub delegates: Vec<Pubkey>,  // delegates allowed to send transactions via this account
}

impl DelegatedAccount {
    pub const SIZE_WITHOUT_DELEGATES: usize = DISCRIMINATOR_LENGTH + // discriminator
        PUBLIC_KEY_LENGTH + // project account
        PUBLIC_KEY_LENGTH // owner
        + 4; //buffer, getting a serialization error without thi

    pub fn init(&mut self, owner: &Pubkey, project_account: &Pubkey, delegates: Vec<Pubkey>) {
        self.owner = *owner;
        self.project_account = *project_account;
        self.delegates = delegates;
    }

    pub fn is_delegate(&self, delegate: Pubkey) -> Option<usize> {
        match self.delegates.binary_search(&delegate) {
            Ok(idx) => Some(idx),
            _ => None,
        }
    }

    pub fn add_delegate(&mut self, new_delegate: Pubkey) -> Result<()> {
        if matches!(self.is_delegate(new_delegate), None) {
            self.delegates.push(new_delegate);
        }
        Ok(())
    }

    pub fn remove_delegate(&mut self, delegate: Pubkey) -> Result<()> {
        if let Some(idx) = self.is_delegate(delegate) {
            self.delegates.remove(idx);
        }
        Ok(())
    }
}

#[account]
pub struct DummyPda {
    pub delegated: Pubkey,
    pub data: u8,
}

#[derive(Debug, PartialEq, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AdTransaction {
    pub instructions: Vec<AdInstruction>,
}

#[derive(Debug, PartialEq, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AdInstruction {
    /// Pubkey of the program that executes this instruction.
    pub program_id: Pubkey,
    /// Metadata describing accounts that should be passed to the program.
    pub accounts: Vec<AdAccountMeta>,
    /// Opaque data passed to the program for its own interpretation.
    pub data: Vec<u8>,
    pub index: u8,
}

#[derive(Debug, Default, PartialEq, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AdAccountMeta {
    /// An account's public key.
    pub pubkey: Pubkey,
    /// True if an `Instruction` requires a `Transaction` signature matching `pubkey`.
    pub is_signer: bool,
    /// True if the account data or metadata may be mutated during program execution.
    pub is_writable: bool,
}
