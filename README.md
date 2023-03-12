# RayAuth

> RayAuth aims to improve the user onboarding flow on Solana dApps and make the transaction UX user-friendly. This is achieved through the following 3 solutions:

## Features

- [Social login enabled non-custodial wallet](#social-login-enabled-non-custodial-wallet) - Users don't need to install a browser extension or worry about securely storing their private keys. They can simply login with their social accounts and start using the dApp.
- [Gasless transactions](#gasless-transactions) - Users don't need to worry about buying SOL or paying for the transaction fees. The dApp pays for the transaction fees on behalf of the user.
- [Session keys](#session-keys) - Session keys are keypairs which are approved to act as signers on the user's behalf for a limited time. It is stored locally and can be revoked at any time. This allows the dApp to sign transactions on the user's behalf without the user having to sign the transaction from the client device.

## Social login enabled non-custodial wallet

We create a regular Solana keypair which consists of a public key and a private key. Instead of storing this private key like most custodial wallet solutions, we split it into 3 shares -

### Device Share

This share is stored on the user's browser. A new share is issued for each new device (or browser) they login from.

### Recovery Share

This share is sent via email to the user. It acts as an easily accessible and safe backup key. Whenever the user logs in to a new device (or browser), they are asked to enter the recovery share as it is used to issue a new device share.

### Social Share

This share is further 3 shares and stored in 3 differenet databases to ensure maximum security. All 3 shares need to be obtained for the social share to be reconstruced. This happens automatically when a user logs in with there social login method but if any 1 or even 2 of the databases were to be compromised, the social share wouild remain safe.

---

At least 2 of these 3 shares are required to reconstruct the main private key. Typically this will be a combination of the social share and the device share. The private key is never stored anywhere, even when the user is logged in, rather reconstruced on the fly using the shares. When the user logs in to a new device, the social share and the recovery share are used to reconstruct the private key and issue a new share.

---

![Wallet flowchart](/assets/flowcharts/wallet.excalidraw.png)

## Gasless transactions

The biggest problem for new users interacting with dApps is that they typically don't have SOL to pay gas fees for any transaction. Since gas fees are very low in Solana (< 0.001 USD), the applications that the user is interacting with can easily pay the gas fees on behalf of the user.

With RayAuth, projects get their account that they fund with SOL (this is called the gas tank but is also used as the project account for [Account Delegation](/architecture/account-delegation)).

This gas tank account is set as the fee payer for gasless transactions and sent via our relayer node where they are signed with the gas tank's keypair.

![Gasless transactions flowchart](/assets/flowcharts/gasless.excalidraw.png)

## Session keys
