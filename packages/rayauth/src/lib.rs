use borsh::BorshDeserialize;
use solana_program::{account_info::AccountInfo, clock::Clock, pubkey::Pubkey};

#[derive(BorshDeserialize, Debug)]
pub struct SessionKeyPDAData {
    pub user: Pubkey,
    pub session_key: Pubkey,
    pub expires_at: i64,
}

pub fn is_session_key_valid(account: AccountInfo) -> bool {
    let data = SessionKeyPDAData::try_from_slice(&account.data.borrow()).unwrap();
    let clock = Clock::get()?;

    if clock.unix_timestamp < data.expires_at {
        return false;
    }

    return true;
}
