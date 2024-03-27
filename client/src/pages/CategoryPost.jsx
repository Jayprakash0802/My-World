import { useEffect, useState } from "react"
import { PostItem } from "../components"
import { useParams } from "react-router-dom"
import axios from "axios";
import Loader from "../components/Loader";

export default function CategoryPost(){
    const [posts,setPosts]=useState([])
    const {category} = useParams();
    const [isLoading,setIsloading] = useState(false)

    useEffect(()=>{
        const fetchPosts = async ()=>{
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
                setPosts(response?.data);
                console.log(response)
                
            } catch (err) {
                console.log(err);
            }
            setIsloading(false);
        }
        fetchPosts()
    },[category])

    if(isLoading) return <Loader/>
    return(
        <>
            <section >
                {posts.length  ?
                    <div className="container posts__container">
                        {posts.map((post) => (<PostItem key={post.id} post={post} />))}
                    </div> :
                    <h2 className="center">No Posts Found</h2>
                }
            </section>
        </>
    )
}