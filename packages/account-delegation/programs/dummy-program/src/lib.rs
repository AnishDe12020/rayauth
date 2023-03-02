use anchor_lang::prelude::*;

declare_id!("6Xf5XGsg8trkvZnNenGpusQJudfTPY77Girr6TVDkqMs");

#[program]
pub mod dummy_program {
    use super::*;

    pub fn execute_dummy_instruction(ctx: Context<DummyInstruction>, data: u8) -> Result<()> {
        ctx.accounts.pda.data = data;
        ctx.accounts.pda.owner = *ctx.accounts.owner.key;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct DummyInstruction<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: This is the account that will be used to sign the instruction
    pub owner: Signer<'info>,
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
