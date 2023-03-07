import { useState } from "react";
import "./App.css";
import { useAuth } from "../../src";
import { providers } from "../../src/enums";
import { useEffect } from "react";
import {UserComponent} from "../../src";
function App() {
  const [count, setCount] = useState(0);
  const { signIn, signOut, user, isLoading, handleCallback } = useAuth("help");
  console.log("User", user);
  const config= {
    callbackUrl: "http://localhost:5173/",
    clientId: "test",
    provider: providers.google,
    cookieName: "cookie"
  }
  useEffect(() => {
    handleCallback();
  }, [])
  return (
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>
      <UserComponent/>
    </div>
  );
}

export default App;
