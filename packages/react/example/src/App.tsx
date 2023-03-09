import "./App.css";
import { useAuth, useTxns } from "../../src";
import { useEffect } from "react";
function App() {
  const { signIn, signOut, user, isLoading, handleCallback, walletListener } = useAuth("cookie");
  const {signTxn} = useTxns(user as any)
  console.log("User", user?.state);
  useEffect(() => {
    handleCallback();
  }, [])
  return (
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>

      <button onClick={() => {
        const chalja = async () => {
        const result =  signTxn(null, "Hello")
        console.log("result", result)
        }
        chalja()
      }}>
         SignTxn test
      </button >
    </div>
  );
}

export default App;
