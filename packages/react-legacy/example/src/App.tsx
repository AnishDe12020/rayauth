import "./App.css";
import { useAuth } from "../../src";
import { useEffect } from "react";
import {MyDialog} from "../component/Modal"
import secrets from "secrets.js-grempe"
function App() {
  const { signIn, signOut, user, isLoading, handleCallback, walletListener } = useAuth("cookie");

  console.log("User", user?.state);
  useEffect(() => {
    handleCallback();
   console.log(secrets.share("qfergreggtgtg", 3, 2))
  }, [])
  return (
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>
      <MyDialog/>
      <button onClick={() => {
        const chalja = async () => {
        const result = await user?.testSign( "Hello")
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
