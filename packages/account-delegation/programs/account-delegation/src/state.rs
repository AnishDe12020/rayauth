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
}
