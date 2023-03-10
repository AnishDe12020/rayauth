use anchor_lang::prelude::*;
use rayauth_session::program::RayauthSession;
use rayauth_session::SessionKey;

declare_id!("GCzDXYdEaz3RQ92Ghg7MPLD9mc3h6JgSzMurMsFjTJ3W");

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const STRING_CHAR_MULTIPLIER: usize = 4;
const U64_LENGTH: usize = 8;

#[program]
pub mod dummy_program {
    use super::*;

    pub fn execute_dummy_instruction(ctx: Context<DummyInstruction>, data: u8) -> Result<()> {
        let owner = &ctx.accounts.owner;

        ctx.accounts.pda.data = data;
        ctx.accounts.pda.owner = owner.key();

        Ok(())
    }

    pub fn create_product(
        ctx: Context<CreateProduct>,
        maker_twitter: String,
        name: String,
        description: String,
        logo_url: String,
        website_url: String,
        twitter_url: String,
    ) -> Result<()> {
        let hunter = &ctx.accounts.hunter_signer;

        ctx.accounts.product.hunter = hunter.user;
        ctx.accounts.product.maker_twitter = maker_twitter;
        ctx.accounts.product.name = name;
        ctx.accounts.product.description = description;
        ctx.accounts.product.logo_url = logo_url;
        ctx.accounts.product.website_url = website_url;
        ctx.accounts.product.twitter_url = twitter_url;
        ctx.accounts.product.upvotes = 0;

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

#[derive(Accounts)]
#[instruction(maker_twitter: String, name: String, description: String, logo_url: String, website_url: String, twitter_url: String)]
pub struct CreateProduct<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        seeds = [SessionKey::SEED_PREFIX.as_ref(), hunter_signer.session_key.as_ref()],
        seeds::program = RayauthSession::id(),
        bump,
        constraint = hunter_signer.is_valid()? == true,
    )]
    pub hunter_signer: Account<'info, SessionKey>,
    #[account(
        init,
        payer = payer,
        space = Product::SPACE,
        seeds = [b"product".as_ref(), name.as_ref()],
        bump,
    )]
    pub product: Account<'info, Product>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Upvote<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        seeds = [SessionKey::SEED_PREFIX.as_ref(), voter_signer.session_key.as_ref()],
        seeds::program = RayauthSession::id(),
        bump,
        constraint = voter_signer.is_valid()? == true,
    )]
    pub voter_signer: Account<'info, SessionKey>,
    #[account(
        mut,
        seeds = [b"product".as_ref(), product.name.as_ref()],
        bump,
    )]
    pub product: Account<'info, Product>,
    #[account(
        init,
        payer = payer,
        seeds = [b"upvote".as_ref(), product.name.as_ref(), voter_signer.user.as_ref()],
        bump,
        space = UpvoteAaccount::SPACE,
    )]
    pub upvote_account: Account<'info, UpvoteAaccount>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct DummyPda {
    pub owner: Pubkey,
    pub data: u8,
}

#[account]
pub struct Product {
    pub hunter: Pubkey,
    pub maker_twitter: String,
    pub name: String,
    pub description: String,
    pub logo_url: String,
    pub website_url: String,
    pub twitter_url: String,
    pub upvotes: u64,
}

impl Product {
    const SPACE: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + (STRING_LENGTH_PREFIX + (STRING_CHAR_MULTIPLIER * 50))
        + (STRING_LENGTH_PREFIX + (STRING_CHAR_MULTIPLIER * 50))
        + (STRING_LENGTH_PREFIX + (STRING_CHAR_MULTIPLIER * 200))
        + (STRING_LENGTH_PREFIX + (STRING_CHAR_MULTIPLIER * 200))
        + (STRING_LENGTH_PREFIX + (STRING_CHAR_MULTIPLIER * 200))
        + (STRING_LENGTH_PREFIX + (STRING_CHAR_MULTIPLIER * 200))
        + U64_LENGTH;

    pub fn upvote(&mut self) {
        self.upvotes += 1;
    }
}

#[account]
pub struct UpvoteAaccount {
    pub product: Pubkey,
    pub voter: Pubkey,
}

impl UpvoteAaccount {
    const SPACE: usize = DISCRIMINATOR_LENGTH + PUBLIC_KEY_LENGTH + PUBLIC_KEY_LENGTH;
}
