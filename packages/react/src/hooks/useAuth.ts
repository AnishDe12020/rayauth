import { useEffect, useState } from "react";
import { config, userOptions } from "../interfaces"
import {useCookies} from "react-cookie"
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";



export function useAuth(config: config): authInterface{ 
handleCallback();
 let user:userConstructor|null = null
 let isLoading = true
 const [cookies, _, removeCookie] = useCookies(['jwt-rayauth']);
 const signIn = providerFunc(config)
   const signOut = signOutFunc(removeCookie)
  if(!cookies["jwt-rayauth"]) {
    console.log(cookies["jwt-rayauth"])
    console.log("doesnt run")
    user = null
    return {signIn, signOut,user,isLoading}
  }

  console.log(getUser(cookies["jwt-rayauth"]))
  console.log("address", user)
  return {signIn, signOut,user,isLoading}
}   



function providerFunc(options: config): () => void {
    return function signIn(){ 
      const url = new URL(`http://localhost:8080/auth/${options.provider}`)
      url.searchParams.append("cb", options.callbackUrl)
      url.searchParams.append("id", options.clientId)
      console.log(url.toString())
      window.location.replace(url.toString());
    }
}

function signOutFunc(removeCookie: any) {
  return function signOut(){
    removeCookie("jwt-rayauth")
  }
}


function handleCallback() {
  console.log("RUNNING CALLBACK")
  const [cookies, setCookie, removeCookie] = useCookies(['jwt-rayauth']);
   const urlParams = new URLSearchParams(window.location.search);
   const jwt = urlParams.get('jwt');
   if(!jwt) return;
   if(cookies["jwt-rayauth"]) {
    removeCookie("jwt-rayauth");
    setCookie("jwt-rayauth", jwt)
  }
}

function syncUser(datauser:any, user:userConstructor) {
 user.id = datauser.id
 user.address = datauser.address
 user.email = datauser.email
 user.createdAt = datauser.createdAt
 user.updatedAt = datauser.updatedAt
}