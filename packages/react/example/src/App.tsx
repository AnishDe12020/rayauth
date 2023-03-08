import "./App.css";
import { useAuth } from "../../src";
import { useEffect } from "react";
function App() {
  const { signIn, signOut, user, isLoading, handleCallback, walletListener } = useAuth("cookie");
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
        const result = await user?.testSign("Hello")
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
