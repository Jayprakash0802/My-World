import { useEffect, useState } from "react"
import { PostItem } from "../components"
import Loader from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function AuthorPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsloading] = useState(false);
    const { id } = useParams();
    const [userExist, setUserExist] = useState(false);
    useEffect(() => {
        const findUser = async () => {
            try {
                const find = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`)
                if(find) setUserExist(true);
            } catch (err) {
                console.log(err)
            }
        }
        findUser();
    }, [id])

    useEffect(() => {
        const fetchPosts = async () => {
            setIsloading(true)
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/user/${id}`)
                setPosts(response?.data)
            } catch (err) {
                console.log(err);
            }
            setIsloading(false)
        }
        fetchPosts();
    }, [id])
    // if(!posts.length) setError(true);

    if (isLoading) return <Loader />

    return (
        <>
            {userExist ?
                <section className="posts">
                    {posts.length ?
                        <div className="container posts__container">
                            {posts.map((post) => (<PostItem key={post.id} post={post} />))}
                        </div> :
                        <h2 className="center">No Posts Found</h2>
                    }
                </section>
                :
                <ErrorPage link="/" linkMessage="Go back to home" Message="No user found"/>
            }
        </>
    )
}