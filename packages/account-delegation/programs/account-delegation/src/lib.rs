use anchor_lang::{
    prelude::*, solana_program::instruction::AccountMeta, solana_program::instruction::Instruction,
    solana_program::program::invoke_signed,
};

declare_id!("6gJXtZUfzB7tiu7i1PA1tJDJgWSyamuLgdBaSs8QFhNK");

pub mod account;
pub mod constants;
pub mod errors;
pub mod state;

use crate::account::*;
use crate::errors::*;
use crate::state::*;

#[program]
pub mod account_delegation {

    use crate::{
        constants::PUBLIC_KEY_LENGTH,
        state::{AdTransaction, DelegatedAccount},
    };

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

    pub fn remove_delegate(ctx: Context<DelegatedAccountRealloc>, delegate: Pubkey) -> Result<()> {
        let delegated_account = &mut ctx.accounts.delegated;
        let owner = &ctx.accounts.owner;

        if delegated_account.owner != *owner.key {
            return Err(AccountDelegationError::NotSufficientPermission.into());
        }

        delegated_account.remove_delegate(delegate)?;

        Ok(())
    }

    pub fn execute_transaction<'info>(
        // ctx: Context<ExecuteTransaction>,
        ctx: Context<'_, '_, '_, 'info, ExecuteTransaction<'info>>,

        tx: AdTransaction,
    ) -> Result<()> {
        let delegated_account = &ctx.accounts.delegated;
        let payer = &ctx.accounts.payer;
        let project_account = &ctx.accounts.project_account;

        if delegated_account.project_account != *project_account.key {
            return Err(AccountDelegationError::NotSufficientPermission.into());
        }

        let delegates = &delegated_account.delegates;

        if !delegates.contains(&payer.key) {
            return Err(AccountDelegationError::NotSufficientPermission.into());
        }

        let instructions = tx.instructions;
        let ix_len: u8 = instructions.len() as u8;
        let ix_iter = instructions.into_iter();

        msg!("Executing {} instructions", ix_len);

        (0..ix_len).try_for_each(|i: u8| -> Result<()> {
            let ad_ix = ix_iter.clone().nth(i as usize).unwrap();

            let accounts: Vec<AccountMeta> = ad_ix
                .accounts
                .iter()
                .map(|a| {
                    if a.is_writable {
                        AccountMeta::new(a.pubkey, a.is_signer)
                    } else {
                        AccountMeta::new_readonly(a.pubkey, a.is_signer)
                    }
                })
                .collect();

            let ix = Instruction::new_with_borsh(ad_ix.program_id, &ad_ix.data, accounts);

            msg!("Executing instruction: {:?}", ix);

            // let mut account_infos = vec![payer.to_account_info()];

            // account_infos.extend(remaining_accounts.clone());

            let remaining_accounts = ctx.remaining_accounts;

            let account_infos = [
                &[ctx.accounts.payer.to_account_info()],
                &remaining_accounts[..],
            ]
            .concat();

            invoke_signed(&ix, &account_infos, &[&[&b"account-delegation"[..]]])?;

            Ok(())
        })?;

        Ok(())
    }

    pub fn execute_dummy_instruction(ctx: Context<DummyInstruction>, data: u8) -> Result<()> {
        ctx.accounts.pda.data = data;

        Ok(())
    }
}
