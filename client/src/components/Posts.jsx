import { useEffect, useState } from "react"
import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from "axios";


export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        const fetchPost = async () => {
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
                setPosts(response?.data)
            } catch (err) {
                console.log(err)
            }
            setIsloading(false)
        }
        fetchPost()
    },[])
    if(isLoading) return < Loader/>
    return (
        <>
            {posts.length ?
                <section className="posts">
                    <div className="container posts__container ">
                        {posts.map((post) => (<PostItem key={post?._id} post={post} />))}
                    </div>
                </section>
                :

                <h2 className="center">No Posts Found</h2>
            }
        </>
    )
}   