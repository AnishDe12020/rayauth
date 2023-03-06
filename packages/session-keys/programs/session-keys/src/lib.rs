use anchor_lang::prelude::*;

declare_id!("FtvHhThBncuod3TXm3NW7YFwpC8WXNUdPYP8fqt6SsEC");

#[event]
pub struct SessionKeyAdded {
    user: Pubkey,
    session_key: Pubkey,
    expires_at: u64,
}

#[program]
pub mod session_keys {
    use super::*;

    pub fn add_session_key(
        ctx: Context<AddSessionKey>,
        session_key: Pubkey,
        expires_at: u64,
    ) -> Result<()> {
        let session_key_pda = &mut ctx.accounts.session_key_pda;
        let clock = Clock::get()?;

        if clock.unix_timestamp > expires_at.try_into().unwrap() {
            return Err(ErrorCode::InvalidExpiresAt.into());
        }

        session_key_pda.user = *ctx.accounts.user.key;
        session_key_pda.session_key = session_key;
        session_key_pda.expires_at = expires_at;

        msg!("Session key added");
        emit!(SessionKeyAdded {
            user: *ctx.accounts.user.key,
            session_key,
            expires_at,
        });

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(session_key: Pubkey)]
pub struct AddSessionKey<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub user: Signer<'info>,
    #[account(
        init,
        seeds = [session_key.as_ref()],
        bump,
        payer = payer,
        space = SessionKey::SPACE,
   )]
    pub session_key_pda: Account<'info, SessionKey>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct SessionKey {
    pub user: Pubkey,
    pub session_key: Pubkey,
    pub expires_at: u64,
}

impl SessionKey {
    const SPACE: usize = 8 // discriminator
    + 32 // user
    + 32 // session_key
    + 8; // expires_at
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid expires at")]
    InvalidExpiresAt,
}
