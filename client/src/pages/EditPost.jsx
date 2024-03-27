import { useEffect, useState } from "react"
import { categoriesData, modules, formats } from "../constants/data"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import ErrorPage from "./ErrorPage"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Loader from "../components/Loader"

export default function EditPost() {
    const { id } = useParams();
    const { currUser } = useContext(UserContext);
    const token = currUser?.token
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Uncategorized')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const [post, setPost] = useState(null)
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                setPost(response?.data);
            } catch (err) {
                console.log(err);
            }
            setIsloading(false);
        }
        fetchPost()
    }, [currUser])

    useEffect(() => {
        if (post) {
            setTitle(post.title || '');
            setCategory(post.category || '');
            setDescription(post.description || '');
            setThumbnail(post?.thumbnail?.url || '');
        }
    }, [post]);
    const edit = async (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('title', title);
        postData.append('category', category);
        postData.append('description', description);
        postData.append('image', thumbnail);
        try {
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
            navigate(`/posts/${id}`);

        } catch (err) {
            setError(err.response.data.message);
        }
    }
    const handleQuill = (value) => {
        setDescription(value)
    }
    if (isLoading) return <Loader />
    return (
        <>
            {currUser?.id === post?.creator ?
                <section className="create-post">
                    <div className="container">
                        <h2>Edit Post</h2>
                        {error && <p className="form__error"> {error} </p>}
                        <form className="form create__post-form" onSubmit={edit}>
                            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
                            <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                                {
                                    categoriesData.map(cat => <option key={cat}>{cat}</option>)
                                }
                            </select>
                            <ReactQuill modules={modules} formats={formats} value={description} onChange={handleQuill} />
                            <input type="file" name="image" onChange={e => setThumbnail(e.target.files[0])} accept="png, jpg, jpeg" className="choosefile" />
                            <button type="submit" className="btn primary">Update</button>
                        </form>
                    </div>
                </section>
                :
                <ErrorPage />
            }

        </>
    )
}