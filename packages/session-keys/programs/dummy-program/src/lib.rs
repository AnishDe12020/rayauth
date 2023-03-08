use anchor_lang::prelude::*;
use rayauth_session::program::RayauthSession;
use rayauth_session::SessionKey;

declare_id!("GCzDXYdEaz3RQ92Ghg7MPLD9mc3h6JgSzMurMsFjTJ3W");

#[program]
pub mod dummy_program {
    use super::*;

    pub fn execute_dummy_instruction(ctx: Context<DummyInstruction>, data: u8) -> Result<()> {
        let owner = &ctx.accounts.owner;

        ctx.accounts.pda.data = data;
        ctx.accounts.pda.owner = owner.key();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct DummyInstruction<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        seeds = [SessionKey::SEED_PREFIX.as_ref(), owner.session_key.as_ref()],
        seeds::program = RayauthSession::id(),
        bump,
        constraint = owner.is_valid()? == true,
    )]
    pub owner: Account<'info, SessionKey>,
    #[account(
        init,
        payer = payer,
        space = 48,
        seeds = [b"dummy".as_ref(), owner.user.as_ref()],
        bump,
    )]
    pub pda: Account<'info, DummyPda>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[account]
pub struct DummyPda {
    pub owner: Pubkey,
    pub data: u8,
}
