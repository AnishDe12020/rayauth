import "./App.css";
import {useAuth, useSessionProgram} from "rayauth-react"
import { useEffect } from "react";
import { MyDialog } from "../component/Modal";
function App() {
  const { signIn, signOut, user, isLoading, handleCallback, walletListener } =
    useAuth();

    console.log("User", user?.state);
  const { addSessionToken } = useSessionProgram();

  
  useEffect(() => {
    handleCallback();
  }, []);
  return (
    <div className="App">
      <button onClick={() => signIn()}> SignIn </button>
      <button onClick={() => signOut()}> SignOut </button>
      <div> {user?.address} </div>
      <div>{String(isLoading)} </div>

      <button
        onClick={() => {
         // const chalja = async () => {
          //   const result = await user?.testSign("Hello");
          //   console.log("result", result);
          // };
          // chalja();

         console.log(addSessionToken())
        }}
      >
        add session token
      </button>
    </div>
  );
}

export default App;
