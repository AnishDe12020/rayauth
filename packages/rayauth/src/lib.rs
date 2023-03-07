// use borsh::{BorshDeserialize, BorshSchema, BorshSerialize};
use borsh::BorshDeserialize;
use solana_program::{account_info::AccountInfo, clock::Clock, pubkey::Pubkey};

// #[derive(
//     BorshDeserialize,
//     BorshSchema,
//     BorshSerialize,
//     Clone,
//     Copy,
//     Default,
//     Eq,
//     Hash,
//     Ord,
//     PartialEq,
//     PartialOrd,
// )]
// pub struct Pubkey(pub(crate) [u8; 32]);

#[derive(BorshDeserialize)]
pub struct SessionKeyPDAData {
    pub user: Pubkey,
    pub session_key: Pubkey,
    pub expires_at: i64,
}

pub fn is_session_key_valid(account: &AccountInfo, clock: Clock, signer: Pubkey) -> bool {
    let data = SessionKeyPDAData::try_from_slice(&account.data.borrow()).unwrap();

    if clock.unix_timestamp < data.expires_at {
        return false;
    }

    if signer != data.session_key {
        return false;
    }

    return true;
}
