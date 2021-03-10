/* 
Logout component that erases local storage for a logged in user's Id.
Written by Vincent O.
 */

import { useHistory } from "react-router-dom"

// Sets the local storage of userId to empty, thus logging the user out according to our authentication flow
export const Logout = props => {
  localStorage.setItem("nutshell_user", "")
  useHistory().push("/")
  
  return null
}