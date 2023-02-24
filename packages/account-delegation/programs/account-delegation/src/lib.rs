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
    use crate::{constants::PUBLIC_KEY_LENGTH, state::DelegatedAccount};

    use super::*;

    pub fn create_delegated_account(
        ctx: Context<CreatedDelegatedAccount>,
        delegates: Vec<Pubkey>,
    ) -> Result<()> {
        let delegated_account = &mut ctx.accounts.delegated;
        let owner = &ctx.accounts.owner;
        let project_account = &ctx.accounts.project_account;

        let mut delegates = delegates;
        // delegates.sort();
        delegates.dedup();

        let total_delegate_count = delegates.len();

        if total_delegate_count == 0 {
            return Err(AccountDelegationError::NoDelegatesProvided.into());
        }

        if total_delegate_count > usize::from(u16::MAX) {
            return Err(AccountDelegationError::MaxDelegatesReached.into());
        }

        delegated_account.init(owner.key, project_account.key, delegates);

        Ok(())
    }

    pub fn add_delegate(ctx: Context<DelegatedAccountRealloc>, new_delegate: Pubkey) -> Result<()> {
        let delegated_account = &mut ctx.accounts.delegated;
        let owner = &ctx.accounts.owner;
        let rent = &ctx.accounts.rent;

        if delegated_account.owner != *owner.key {
            return Err(AccountDelegationError::NotSufficientPermission.into());
        }

        let delegated_account_info = delegated_account.to_account_info();

        if *delegated_account_info.owner != account_delegation::ID {
            return Err(AccountDelegationError::InvalidDelegate.into());
        }

        let current_data_size = delegated_account_info.data.borrow().len();

        let spots_left = ((current_data_size - DelegatedAccount::SIZE_WITHOUT_DELEGATES)
            / PUBLIC_KEY_LENGTH)
            - delegated_account.delegates.len();

        if spots_left < 1 {
            let needed_len = current_data_size + 32;

            AccountInfo::realloc(&delegated_account_info, needed_len, false)?;

            let rent_exempt_lamports = rent.minimum_balance(needed_len).max(1);
            let top_up_lamports =
                rent_exempt_lamports.saturating_sub(delegated_account_info.lamports());

            if top_up_lamports > 0 {
                return Err(AccountDelegationError::NotEnoughLamports.into());
            }
        }

        delegated_account.reload()?;

        delegated_account.add_delegate(new_delegate)?;

        Ok(())
    }
}
