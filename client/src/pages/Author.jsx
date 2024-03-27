import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"



export default function Author() {
    const [authors, setAuthors] = useState([])
    const [isLoading,setIsloading] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
                setAuthors(response.data)
            } catch (error) {
                console.log(error)
            }
            setIsloading(false);
        }
        fetch();
    }, [])
    if(isLoading) return <Loader/>
    return (
        <>
            <section className="authors">
                {authors.length ?
                    <div className="container authors__container">
                        {authors.map((author) => {
                            {console.log(author._id)}
                            return <Link key={author._id} to={`/posts/users/${author._id}`} className="author">
                                <div className="author__avatar">
                                    <img src={author.avatar?.url} alt={`Avatar of ${author.name}`} />
                                </div>
                                <div className="author__info">
                                    <h4>{author.name}</h4>
                                    <p>{author.posts} posts</p>
                                </div>
                            </Link>

                        })}
                    </div> :
                    <h1 className="center">No Authors Found</h1>}
            </section>
        </>
    )
}