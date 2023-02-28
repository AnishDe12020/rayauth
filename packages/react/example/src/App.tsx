import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {useAuth} from "../../src"
import { providers } from '../../src/enums'

function App() {
  const [count, setCount] = useState(0)
  const {signIn, signOut, user, isLoading} = useAuth({
    clientId: "63fc80e8da0cb8775e46fc73",
    callbackUrl: "http://localhost:5173",
    provider: providers.google
  })
  console.log("User", user)
  return (
    <div className="App">
     <button onClick={() => signIn()}> SignIn </button>
     <button onClick={() => signOut()}> SignOut </button>
     <div> {user?.address} </div>
     <div>{String(isLoading)} </div>


    </div>
  )
}

export default App
