use anchor_lang::prelude::*;

#[error_code]
pub enum AccountDelegationError {
    #[msg("No delegates provided")]
    NoDelegatesProvided,
    #[msg("Maximum number of delegates reached")]
    MaxDelegatesReached,
    #[msg("Invalid delegate")]
    InvalidDelegate,
    #[msg("Not enough lamports")]
    NotEnoughLamports,
    #[msg("Not sufficient permission")]
    NotSufficientPermission,
}
