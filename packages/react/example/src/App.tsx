import { useState } from "react";
import "./App.css";
import { useAuth } from "../../src";
import { providers } from "../../src/enums";
import { RayAuthProvider } from "../../src/providers";

function App() {
  const [count, setCount] = useState(0);
  const { signIn, signOut, user, isLoading } = useAuth();
  console.log("User", user);
  const config= {
    callbackUrl: "http://localhost:5173/",
    clientId: "test",
    provider: providers.google,
  }
  return (
    <RayAuthProvider config={config}> 
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>
    </div>
    </RayAuthProvider>
  );
}

export default App;
