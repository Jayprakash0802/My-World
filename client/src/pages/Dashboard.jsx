import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const { currUser } = useContext(UserContext);
    const token = currUser?.token
    const {id} = useParams();

    useEffect(()=>{
        const showPosts = async()=>{
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/user/${currUser?.id}`)

                setPosts(response?.data);
            } catch (error) {
                console.log(error);
            }
            setIsloading(false);
        }
        if(token) showPosts();
    },[id])
    if(isLoading) return <Loader/>

    return (
        <>
            {token && currUser.id==id ?
                <section className="dashboard">
                    {
                        posts.length ?
                            <div className="container dashboard__container">
                                {
                                    posts.map((post) => {
                                        return <article key={post?._id} className="dashboard__post">
                                            <div className="dashboard__post-info">
                                                <div className="dashboard__post-thumbnail">
                                                    <img src={post?.thumbnail?.url} alt="" />
                                                </div>
                                                <h5>{post?.title}</h5>
                                            </div>
                                            <div className="dashboard__post-actions">
                                                <Link to={`/posts/${post?._id}`} className="btn sm">View</Link>
                                                <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">Edit</Link>
                                                <DeletePost id={post._id}/>
                                            </div>
                                        </article>
                                    })
                                }

                            </div> :
                            <h2 className="center">You have No posts yet.</h2>
                    }
                </section>
                :
                <ErrorPage link="/" linkMessage="Back to home" Message="Page not found"/>
            }

        </>
    )
}