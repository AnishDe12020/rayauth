use anchor_lang::prelude::*;

extern crate rayauth;

use rayauth::is_session_key_valid;

declare_id!("6Xf5XGsg8trkvZnNenGpusQJudfTPY77Girr6TVDkqMs");

#[program]
pub mod dummy_program {
    use super::*;

    pub fn execute_dummy_instruction(ctx: Context<DummyInstruction>, data: u8) -> Result<()> {
        let owner = &ctx.accounts.owner;
        let signer_pda = &ctx.accounts.signer_pda;

        let clock = Clock::get()?;

        let is_valid = is_session_key_valid(signer_pda, clock, owner.key());

        if !is_valid {
            return Err(ErrorCode::InvalidSessionKey.into());
        }

        msg!("Is owner a signer? {}", owner.is_signer);

        ctx.accounts.pda.data = data;
        ctx.accounts.pda.owner = owner.key();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct DummyInstruction<'info> {
    /// CHECK: not writing
    pub owner: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub signer_pda: AccountInfo<'info>,
    #[account(
        init,
        payer = payer,
        space = 48,
        seeds = [b"dummy".as_ref(), owner.key.as_ref()],
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
