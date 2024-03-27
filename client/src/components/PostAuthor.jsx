import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"

TimeAgo.addDefaultLocale(en)
TimeAgo.addDefaultLocale(ru)

export default function PostAuthor({createdAt,creator}){
    const [author,setAuthor]= useState({})
    useEffect(()=>{
        const getAuthor = async ()=>{
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creator}`)
                setAuthor(response?.data);
                
            } catch (error) {
                console.log(error)
            }
        }
        getAuthor()
    },[])
    
    // console.log(author)
    return(
        <Link to={`/posts/users/${creator}`} className="post__author">
            <div className="post__author-avatar">
                <img src={author?.avatar?.url} alt=""/>
            </div>
            <div className="post__author-details">
                <h5>
                    By: {author.name}
                </h5>
                <small><ReactTimeAgo date={new Date(createdAt)} /></small>
            </div>
        </Link>
    );
}