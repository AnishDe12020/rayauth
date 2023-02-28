import { config } from "../interfaces"
import {useCookies} from "react-cookie"



export function useAuth(config: config){ 

const [cookies, setCookie, removeCookie] = useCookies(['token']);
   if(cookies.token) {
    
  }
   const urlParams = new URLSearchParams(window.location.search);
   const jwt = urlParams.get('jwt');
   console.log(jwt)

   const signIn = providerFunc(config)
   const signOut = signOutFunc(removeCookie)
   return { signIn, signOut}
}   



function providerFunc(options: config): () => void {
    return function signIn(){ 
      const url = new URL(`http://localhost:8080/auth/${options.provider}`)
      url.searchParams.append("cb", options.callbackUrl)
      url.searchParams.append("id", options.clientId)
      window.location.replace(url.toString());
    }
}

function signOutFunc(removeCookie: any) {
  return function signOut(){
    removeCookie("token")
  }
}