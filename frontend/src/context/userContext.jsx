import { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{
    const storedUser = localStorage.getItem('user')
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null)
    const verifyUser = (f)=>{
     setUser(f)
    }
    useEffect(()=>{
      localStorage.setItem('user', JSON.stringify(user))
    }, [user])
    return(
        <UserContext.Provider value={{user, verifyUser}}>{children}</UserContext.Provider>
    )
}