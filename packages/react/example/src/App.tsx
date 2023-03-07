import "./App.css";
import { useAuth } from "../../src";
import { useEffect } from "react";
function App() {
  const { signIn, signOut, user, isLoading, handleCallback } = useAuth("help");
  console.log("User", user);
  user?.onSignTransac((data:{}) => {
    console.log(data)
  })
  useEffect(() => {
    window.onmessage = function(e) {
      if (e.data == 'Hi') {
          alert('It works!');
      }
  };
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
