import {useCookies} from "react-cookie"

export function useCookieSetup(): () => void {
    const [cookies, setCookie, removeCookie] = useCookies(["jwt-rayauth"])
    const handleCallback = () => {
        console.log("RUNNING CALLBACK");
    
        const urlParams = new URLSearchParams(window.location.search);
        const jwt = urlParams.get("jwt");
        console.log("jwt", jwt?.toString())
        if (jwt && cookies["jwt-rayauth"]) {
          console.log("exists", cookies["jwt-rayauth"]);
          removeCookie("jwt-rayauth");
          console.log(setCookie("jwt-rayauth", jwt));
          return
        }
        if (jwt && !cookies["jwt-rayauth"]) {
          console.log("cookie", setCookie("jwt-rayauth", jwt.toString()));
        }
      };
    return handleCallback
}