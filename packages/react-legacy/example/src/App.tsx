import "./App.css";
import { useAuth, useSessionProgram } from "../../src";
import { useEffect } from "react";
import { MyDialog } from "../component/Modal";
function App() {
  const { signIn, signOut, user, isLoading, handleCallback, walletListener } =
    useAuth("cookie");

  const { addSessionToken } = useSessionProgram();

  console.log("User", user?.state);
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

          addSessionToken();
        }}
      >
        add session token
      </button>
    </div>
  );
}

export default App;
