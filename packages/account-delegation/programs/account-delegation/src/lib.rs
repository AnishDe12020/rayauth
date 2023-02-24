use anchor_lang::prelude::*;

declare_id!("6gJXtZUfzB7tiu7i1PA1tJDJgWSyamuLgdBaSs8QFhNK");

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
// const STRING_LENGTH_PREFIX: usize = 4;
// const STRING_CHAR_MULTIPLIER: usize = 4;
// const DB_ID_LENGTH: usize = STRING_LENGTH_PREFIX + (24 * STRING_CHAR_MULTIPLIER);
// const U64_LENGTH: usize = 8;
// const I64_LENGTH: usize = 8;
// const BOOL_LENGTH: usize = 1;

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
            return Err(ErrorCode::NoDelegatesProvided.into());
        }

        delegated_account.init(owner.key, project_account.key, delegates);

        Ok(())
    }
}

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

#[error_code]
pub enum ErrorCode {
    #[msg("No delegates provided")]
    NoDelegatesProvided,
}
