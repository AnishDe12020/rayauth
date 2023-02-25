import { config } from "../interfaces"

export const useMyHook = () => {
    console.log("Hi")
  }
  

export function useAuth(config: config){ 
  console.log(config)
}