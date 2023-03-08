import "./App.css";
import { useAuth } from "../../src";
import { useEffect } from "react";
function App() {
  const { signIn, signOut, user, isLoading, handleCallback, walletListener } = useAuth("help");
  console.log("User", user);
  walletListener.onSignTransac((data:{}) => {
    console.log("data", data)
  })
  useEffect(() => {
    handleCallback();
  }, [])
  return (
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>
    </div>
  );
}

export default App;
