# RayAuth Session Keys Crate

This crate contains the session keys program which can be used by other anchor programs to determine the validity of a session keypair

Program ID: QMj41mN3j168KTuUWNrCgbSAYQ7o9QTaaSnT9gLvW9s

To install, add the following to your `Cargo.toml`:

```toml
[dependencies]
rayauth-session = "0.1.0"
```

## Usage

```rust
use rayauth_session::program::RayauthSession;
use rayauth_session::SessionKey;

#[derive(Accounts)]
#[instruction(maker_twitter: String, name: String, description: String, logo_url: String, website_url: String, twitter_url: String)]
pub struct SessionKeypairIx<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        seeds = [SessionKey::SEED_PREFIX.as_ref(), hunter_signer.session_key.as_ref()],
        seeds::program = RayauthSession::id(),
        bump,
        constraint = signer_key.is_valid()? == true,         // check if the session key has expired or not
        constraint = signer_key.session_key == signer.key(), // checks if the signer is valid
    )]
    pub signer_key: Account<'info, SessionKey>,
    pub signer: Signer<'info>,
}
```
