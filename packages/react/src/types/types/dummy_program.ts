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
    },
    {
      "name": "createProduct",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "hunterSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
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
          "name": "makerTwitter",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "logoUrl",
          "type": "string"
        },
        {
          "name": "websiteUrl",
          "type": "string"
        },
        {
          "name": "twitterUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "upvoteProduct",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "voterSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "upvoteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hunter",
            "type": "publicKey"
          },
          {
            "name": "makerTwitter",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "logoUrl",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          },
          {
            "name": "twitterUrl",
            "type": "string"
          },
          {
            "name": "upvotes",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "upvoteAaccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "product",
            "type": "publicKey"
          },
          {
            "name": "voter",
            "type": "publicKey"
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
    },
    {
      "name": "createProduct",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "hunterSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
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
          "name": "makerTwitter",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "logoUrl",
          "type": "string"
        },
        {
          "name": "websiteUrl",
          "type": "string"
        },
        {
          "name": "twitterUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "upvoteProduct",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "voterSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "upvoteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hunter",
            "type": "publicKey"
          },
          {
            "name": "makerTwitter",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "logoUrl",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          },
          {
            "name": "twitterUrl",
            "type": "string"
          },
          {
            "name": "upvotes",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "upvoteAaccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "product",
            "type": "publicKey"
          },
          {
            "name": "voter",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
