
![Logo](https://pbs.twimg.com/profile_banners/1622519163813244928/1676306743/1500x500)


# 🔐 Rayauth

RayAuth provide users with a non-custodial social-login enabled web-based Solana wallet along with other features like gasless transactions and session keys.






## Features ✨


- 👤 [Social login enabled non-custodial wallet](#social-login-enabled-non-custodial-wallet) - Users don't need to install a browser extension or worry about securely storing their private keys. They can simply login with their social accounts and start using the dApp.
- ⛽️ [Gasless transactions](#gasless-transactions) - Users don't need to worry about buying SOL or paying for the transaction fees. The dApp pays for the transaction fees on behalf of the user.
- 🔑 [Session keys](#session-keys) - Session keys are keypairs which are approved to act as signers on the user's behalf for a limited time. It is stored locally and can be revoked at any time. This allows the dApp to sign transactions on the user's behalf without the user having to sign the transaction from the client device.
## Documentation 📖

[Get started!](https://docs.rayauth.com)

#### Infrastructure 

- [Non-custodial wallet and key security infra](https://docs.rayauth.com/architecture/wallet)
- [Gas less transactions and how they work](https://docs.rayauth.com/architecture/gasless)
- [Session-keys and how they are used to sign transaction on behalf of user](https://docs.rayauth.com/architecture/)

#### React SDK 

- [Installation and setup](https://docs.rayauth.com/react-sdk/installation)
- [Authentication and basic code examples](https://docs.rayauth.com/react-sdk/installation)
- [How to perform transactions](https://docs.rayauth.com/react-sdk/transaction)
- [Using session keys for setting account delegates](https://docs.rayauth.com/react-sdk/session)



## How does this work? ⛓

Here are some flow charts explaining how exactly does rayauth works!

### Social login

![social-login](https://docs.rayauth.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwallet.excalidraw.ddbd3b0e.png&w=1920&q=75)


### Gasless transactions

![Gasless](https://docs.rayauth.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgasless.excalidraw.95823806.png&w=1920&q=75)


### Session Keys

![session-keys](https://media.discordapp.net/attachments/1055538098315989003/1084641695666278420/session-keys.png?width=2206&height=870)



## Examples 💻


#### Authentication 

This is a basic example of authentication using `@rayauth/react` sdk's hooks in react

```ts
import { useAuth } from "@rayauth/react"

function App() {
  const { signIn, signOut, user, isLoading, handleCallback } = useAuth();
 
  useEffect(() => {
    handleCallback();
  }, []);
 
  return (
    <div className="App">
      <button onClick={() => signIn()}> Sign In </button>
      <button onClick={() => signOut()}> Sign Out </button>
      <div>User address: {user?.address}</div>
      <div>Loading: {String(isLoading)}</div>
    </div>
  );
}
 
export default App;
```

#### Session keys

This is a basic example of using session keys using `@rayauth/react` sdk's hook 

```ts
import { useSessionProgram } from "./hooks/useSessionProgram";
 
function MyComponent() {
  const { sessionProgram, addSessionToken, getSessionKeypair, revokeSessionToken } = useSessionProgram();
 
  const handleAddSessionToken = async () => {
    await addSessionToken();
    console.log("Session token added");
  };
 
  const handleGetSessionKeypair = () => {
    const sessionKeypair = getSessionKeypair();
    console.log("Session keypair", sessionKeypair);
  };
 
  const handleRevokeSessionToken = async () => {
    await revokeSessionToken();
    console.log("Session token revoked");
  };
 
  return (
    <div>
      <button onClick={handleAddSessionToken}>Add session token</button>
      <button onClick={handleGetSessionKeypair}>Get session keypair</button>
      <button onClick={handleRevokeSessionToken}>Revoke session token</button>
    </div>
  );
}
```

## Running locally 🏡

```bash
git clone https://github.com/AnishDe12020/rayauth

cd rayauth

pnpm install

cd apps/server && pnpm dev
cd apps/web && pnpm dev
cd packages/react/example && pnpm dev //this is an example react-app for sdks
```

You need add ENV variables as followed in server directory

```bash
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
DISCORD_ID=
DISCORD_SECRET=
PRIVATE_KEY=
DATABASE_URL=
SECRET=
DB_TWO=
DB_THREE=
ELASTIC_EMAIL=
```

This will run the `server`,`app` and `example` locally on ports 
`8080`, `3000` and `5137` respectively.





## Feedback ✍🏻

If you have any feedback, please reach out to us at [@Rayauthhq](https://twitter.com/rayauthhq) on twitter!


## Contributing 🙌🏻

Contributions are always welcome!

- Please adhere to this project's `code of conduct`.
- Join our [discord server](https://discord.gg/Zv5K3Ss2gM)
- Open Prs!



