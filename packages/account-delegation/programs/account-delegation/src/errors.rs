use anchor_lang::prelude::*;

#[error_code]
pub enum AccountDelegationError {
    #[msg("No delegates provided")]
    NoDelegatesProvided,
}
