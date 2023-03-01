use anchor_lang::prelude::*;

declare_id!("6Xf5XGsg8trkvZnNenGpusQJudfTPY77Girr6TVDkqMs");

#[program]
pub mod dummy_program {
    use super::*;

    pub fn execute_dummy_instruction(ctx: Context<DummyInstruction>, data: u8) -> Result<()> {
        ctx.accounts.pda.data = data;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct DummyInstruction<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: we are not writing to the owner account, so we don't need to mark it as mut
    pub delegated_account: AccountInfo<'info>,
    #[account(
        init,
        payer = payer,
        space = 16,
        seeds = [b"dummy".as_ref()],
        bump,
    )]
    pub pda: Account<'info, DummyPda>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[account]
pub struct DummyPda {
    pub data: u8,
}
