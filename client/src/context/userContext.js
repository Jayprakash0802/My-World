import { createContext ,useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [currUser,setCurruser ]  = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currUser))

    },[currUser])
    return <UserContext.Provider value={{currUser, setCurruser}}>{children}</UserContext.Provider>;
}

export default UserProvider;