import { useState } from "react";
import "./App.css";
import { useAuth } from "../../src";
import { providers } from "../../src/enums";
import { RayAuthProvider } from "../../src/providers";
import { useEffect } from "react";
import {UserComponent} from "../../src";
import "../../src/tailwind.css"
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
    <RayAuthProvider config={config}> 
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>
    </div>
    <UserComponent/>
    </RayAuthProvider>
  );
}

export default App;
