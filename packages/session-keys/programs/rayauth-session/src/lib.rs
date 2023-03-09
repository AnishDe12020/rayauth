use anchor_lang::prelude::*;

declare_id!("QMj41mN3j168KTuUWNrCgbSAYQ7o9QTaaSnT9gLvW9s");

#[event]
pub struct SessionKeyAdded {
    user: Pubkey,
    session_key: Pubkey,
    expires_at: i64,
}

#[event]
pub struct SessionKeyRevoked {
    user: Pubkey,
    session_key: Pubkey,
}

#[program]
pub mod rayauth_session {

    use super::*;

    pub fn add_session_key(ctx: Context<AddSessionKey>, expires_at: Option<i64>) -> Result<()> {
        let session_key_pda = &mut ctx.accounts.session_key_pda;
        let session_key = &ctx.accounts.session_key;
        let user = &ctx.accounts.user;

        let clock = Clock::get()?;

        let expires_at = expires_at.unwrap_or(clock.unix_timestamp + 60 * 60 * 1); // 1 hour

        require!(
            expires_at > clock.unix_timestamp,
            ErrorCode::InvalidExpiresAt
        );
        session_key_pda.user = *user.key;
        session_key_pda.session_key = *session_key.key;
        session_key_pda.expires_at = expires_at;

        msg!("Session key added");
        emit!(SessionKeyAdded {
            user: *ctx.accounts.user.key,
            session_key: session_key.key(),
            expires_at,
        });

        emit!(SessionKeyRevoked {
            user: *ctx.accounts.user.key,
            session_key: session_key.key(),
        });

        Ok(())
    }

    pub fn revoke_session_key(ctx: Context<RevokeSessionKey>) -> Result<()> {
        let session_key_pda = &mut ctx.accounts.session_key_pda;
        let user = &mut ctx.accounts.user;

        let user_starting_lamports = user.lamports();
        let session_key_pda_account_info = session_key_pda.to_account_info();

        **user.lamports.borrow_mut() = user_starting_lamports
            .checked_add(session_key_pda_account_info.lamports())
            .unwrap();

        **session_key_pda_account_info.lamports.borrow_mut() = 0;

        let mut session_key_pda_data = session_key_pda_account_info.data.borrow_mut();

        session_key_pda_data.fill(0);

        emit!(SessionKeyRevoked {
            user: *ctx.accounts.user.key,
            session_key: session_key_pda.session_key,
        });

        msg!("Session key revoked");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddSessionKey<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub user: Signer<'info>,
    pub session_key: Signer<'info>,
    #[account(
        init,
        seeds = [SessionKey::SEED_PREFIX.as_ref(), session_key.key.as_ref()],
        bump,
        payer = payer,
        space = SessionKey::SPACE,
   )]
    pub session_key_pda: Account<'info, SessionKey>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevokeSessionKey<'info> {
    #[account(
        mut,
        seeds = [SessionKey::SEED_PREFIX.as_ref(), session_key_pda.session_key.as_ref()],
        bump,
        has_one = user,
        close = user,
   )]
    pub session_key_pda: Account<'info, SessionKey>,
    #[account(mut)]
    pub user: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct SessionKey {
    pub user: Pubkey,
    pub session_key: Pubkey,
    pub expires_at: i64,
}

impl SessionKey {
    pub const SPACE: usize = 8 // discriminator
    + 32 // user
    + 32 // session_key
    + 8; // expires_at
    pub const SEED_PREFIX: &'static str = "session_key";

    pub fn is_valid(&self) -> Result<bool> {
        let now = Clock::get()?.unix_timestamp;
        Ok(now < self.expires_at)
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid expires at")]
    InvalidExpiresAt,
}
