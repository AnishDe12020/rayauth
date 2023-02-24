use anchor_lang::prelude::*;

declare_id!("6gJXtZUfzB7tiu7i1PA1tJDJgWSyamuLgdBaSs8QFhNK");

pub mod account;
pub mod constants;
pub mod errors;
pub mod state;

use crate::account::*;
use crate::errors::*;

#[program]
pub mod account_delegation {
    use super::*;

    pub fn create_delegated_account(
        ctx: Context<CreatedDelegatedAccount>,
        delegates: Vec<Pubkey>,
    ) -> Result<()> {
        let delegated_account = &mut ctx.accounts.delegated;
        let owner = &ctx.accounts.owner;
        let project_account = &ctx.accounts.project_account;

        let mut delegates = delegates;
        delegates.sort();
        delegates.dedup();

        let total_delegate_count = delegates.len();
        if total_delegate_count == 0 {
            return Err(AccountDelegationError::NoDelegatesProvided.into());
        }

        delegated_account.init(owner.key, project_account.key, delegates);

        Ok(())
    }
}
