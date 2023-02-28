import {  userConstructor } from "../classes";

export interface authInterface {
 signIn: () => void,
 signOut: () => void,
 user: userConstructor | null ,
 isLoading: boolean
}