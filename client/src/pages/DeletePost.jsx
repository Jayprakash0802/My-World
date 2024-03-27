import { UserContext } from "../context/userContext"
import { useContext, useEffect, useState } from "react"
import ErrorPage from "./ErrorPage"
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

export default function DeletePost({ id }) {
    const navigate = useNavigate()
    const {currUser} = useContext(UserContext);
    const token = currUser?.token
    const location = useLocation();
    const [isLoading,setIsloading] = useState(false);
    useEffect(()=>{
        if(!token) navigate('/')
    },[])
    const handleDelete = async ()=>{
            setIsloading(true)
            try {
                const respone = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true, headers:{Authorization:`Bearer ${token}`}})
                if(respone.status==200){
                    if(location.pathname==`/myposts/${currUser.id}`) navigate(0);
                    else navigate('/')
                }
            } catch (error) {
                console.log(error)
            }
            setIsloading(false)
    }
    if(isLoading) return <Loader/>
    
    return (
        <>
            {token ?

                <Link className="btn danger sm " onClick={()=>handleDelete(id)}>Delete</Link>

                :
                <ErrorPage Message="Unable to perform this operation" link="/login" linkMessage="Go to Login" />
            }
        </>
    )
}