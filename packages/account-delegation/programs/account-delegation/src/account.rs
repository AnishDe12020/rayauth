use anchor_lang::prelude::*;

use crate::constants::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(delegates: Vec<Pubkey>)]
pub struct CreatedDelegatedAccount<'info> {
    #[account(mut)]
    pub owner: Signer<'info>, // owner of the delegated account (can add delegates)
    #[account(mut)]
    pub payer: Signer<'info>, // payer of the delegated account (can be owner)
    /// CHECK: we are not writing to the project account, so we don't need to mark it as mut
    pub project_account: AccountInfo<'info>, // project account
    #[account(
        init,
        payer = payer,
        space = DelegatedAccount::SIZE_WITHOUT_DELEGATES + (delegates.len() * PUBLIC_KEY_LENGTH),
        seeds = [
            b"delegated_account".as_ref(),
            project_account.key.as_ref(),
            owner.key.as_ref(),
        ],
        bump,
    )]
    pub delegated: Account<'info, DelegatedAccount>, // delegated account
    pub system_program: Program<'info, System>, // system program
}
