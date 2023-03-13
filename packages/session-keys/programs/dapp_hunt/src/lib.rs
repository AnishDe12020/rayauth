use anchor_lang::prelude::*;
use rayauth_session::program::RayauthSession;
use rayauth_session::SessionKey;

declare_id!("8JajHSCMD6p7XoPLe8sMCM6x41sURpT1WZT4JcA3Ffsc");

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const STRING_CHAR_MULTIPLIER: usize = 4;
const U64_LENGTH: usize = 8;

#[program]
pub mod dapp_hunt {
    use super::*;

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

    pub fn upvote_product(ctx: Context<Upvote>) -> Result<()> {
        let voter = &ctx.accounts.voter_signer;
        let product = &mut ctx.accounts.product;

        ctx.accounts.upvote_account.product = product.key();
        ctx.accounts.upvote_account.voter = voter.user;

        product.upvote();

        Ok(())
    }
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
        constraint = hunter_signer.session_key == signer.key(),
    )]
    pub hunter_signer: Account<'info, SessionKey>,
    pub signer: Signer<'info>,
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
        constraint = voter_signer.session_key == signer.key(),
    )]
    pub voter_signer: Account<'info, SessionKey>,
    pub signer: Signer<'info>,
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
