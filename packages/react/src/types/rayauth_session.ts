export type RayauthSession = {
  "version": "0.1.0",
  "name": "rayauth_session",
  "instructions": [
    {
      "name": "addSessionKey",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sessionKey",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sessionKeyPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "expiresAt",
          "type": {
            "option": "i64"
          }
        }
      ]
    },
    {
      "name": "revokeSessionKey",
      "accounts": [
        {
          "name": "sessionKeyPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
      "name": "sessionKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "sessionKey",
            "type": "publicKey"
          },
          {
            "name": "expiresAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "SessionKeyAdded",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "sessionKey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "expiresAt",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "SessionKeyRevoked",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "sessionKey",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidExpiresAt",
      "msg": "Invalid expires at"
    }
  ]
};

export const IDL: RayauthSession = {
  "version": "0.1.0",
  "name": "rayauth_session",
  "instructions": [
    {
      "name": "addSessionKey",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sessionKey",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "sessionKeyPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "expiresAt",
          "type": {
            "option": "i64"
          }
        }
      ]
    },
    {
      "name": "revokeSessionKey",
      "accounts": [
        {
          "name": "sessionKeyPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
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
      "name": "sessionKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "sessionKey",
            "type": "publicKey"
          },
          {
            "name": "expiresAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "SessionKeyAdded",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "sessionKey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "expiresAt",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "SessionKeyRevoked",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "sessionKey",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidExpiresAt",
      "msg": "Invalid expires at"
    }
  ]
};
