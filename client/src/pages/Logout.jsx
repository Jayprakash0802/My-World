import { useContext,useEffect } from "react"

import { UserContext } from "../context/userContext"

import { useNavigate } from "react-router-dom"

export default function Logout(){
    const {setCurruser} = useContext(UserContext);
    const navigate = useNavigate()
    setCurruser(null)
    useEffect(()=>{
        navigate('/')
    },[])
    return(
        <>
            {/* <h1>hello</h1> */}
        </>
    )
}