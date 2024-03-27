import { useEffect, useState } from "react"
import { categoriesData, modules, formats } from "../constants/data"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { UserContext } from "../context/userContext"
import { useContext } from "react"
// import { Link,useNavigate } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Uncategorized')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const { currUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const token = currUser?.token;
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('title', title);
        postData.append('category', category);
        postData.append('description', description);
        postData.append('image', thumbnail);
        const create = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData,{withCredentials:true, headers:{Authorization:`Bearer ${token}`}});
                if(response.status==201) return navigate(`/`)

            } catch (err) {
                setError(err.response.data.message);
            }
        }
        create();
    }
    return (
        <>
            {token ?
                <section className="create-post">
                    <div className="container">
                        <h2>Create Post</h2>
                        {error && <p className="form__error">{error}</p>}
                        <form className="form create__post-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
                            <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                                {
                                    categoriesData.map(cat => <option key={cat}>{cat}</option>)
                                }
                            </select>
                            <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
                            <input type="file" name="image" onChange={e => setThumbnail(e.target.files[0])} accept="png, jpg, jpeg" className="choosefile" />
                            <button type="submit" className="btn primary">Create</button>
                        </form>
                    </div>
                </section>

                : <ErrorPage Message={"You are not logged in"} link={`/login`} linkMessage="Go to Login" />}

        </>
    )
}