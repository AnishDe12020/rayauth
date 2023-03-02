import { useState } from "react";
import "./App.css";
import { useAuth } from "../../src";
import { providers } from "../../src/enums";

function App() {
  const [count, setCount] = useState(0);
  const { signIn, signOut, user, isLoading } = useAuth({
    callbackUrl: "/",
    clientId: "sd",
    provider: providers.discord
  });
  console.log("User", user);
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
