import { useEffect, useState } from "react";
import { config } from "../interfaces"
import {useCookies} from "react-cookie"
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";



export function useAuth(config: config): authInterface{ 
handleCallback();
let user:userConstructor|null = new userConstructor()
 
 let isLoading = true
 const [cookies, _, removeCookie] = useCookies(['token']);
 const signIn = providerFunc(config)
   const signOut = signOutFunc(removeCookie)
  if(!cookies.token) {
   user = null
  //  setIsLoading(false)
   return {signIn, signOut,user,isLoading}
  }
  getUser(cookies.token, user)

  // setIsLoading(true)
  console.log(user)
  return {signIn, signOut,user,isLoading}
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


function handleCallback() {
  console.log("RUNNING CALLBACK")
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
   const urlParams = new URLSearchParams(window.location.search);
   const jwt = urlParams.get('jwt');
   if(!jwt) return;
   if(cookies.token) {
    removeCookie("token");
    setCookie("token", jwt)
  }
}

function syncUser(datauser:any, user:userConstructor) {
 user.id = datauser.id
 user.address = datauser.address
 user.email = datauser.email
 user.createdAt = datauser.createdAt
 user.updatedAt = datauser.updatedAt
}