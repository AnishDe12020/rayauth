export type DummyProgram = {
  "version": "0.1.0",
  "name": "dummy_program",
  "instructions": [
    {
      "name": "executeDummyInstruction",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "dummyPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: DummyProgram = {
  "version": "0.1.0",
  "name": "dummy_program",
  "instructions": [
    {
      "name": "executeDummyInstruction",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "dummyPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
