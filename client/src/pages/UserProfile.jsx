import { Link ,useNavigate} from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import ErrorPage from "./ErrorPage"
import axios from "axios";
import Loader from "../components/Loader";
import gif from "../assets/logo/Loading_icon.gif"

export default function UserProfile() {
    const [avatar, setAvatar] = useState("");
    const [nAvatar,setNavatar] = useState("");
    const [name, setName] = useState('')
    const [confirmpass, setConfirmpass] = useState('')
    const [newpass, setPassword] = useState('')
    const [currpass, setcurrPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    // const [user, setUser] = useState(null)
    const [isAvatartouched, setIsAavatartouched] = useState(false);
    const [isLoading,setIsloading] = useState(false);

    const { currUser } = useContext(UserContext);
    const token = currUser?.token;
    const navigate = useNavigate()

    useEffect(()=>{
        const fetch=async()=>{
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currUser?.id}`);
                const data = response.data;
                setAvatar(data?.avatar?.url)
                setName(data?.name)
                setEmail(data?.email)
                // console.log(avatar,name,email);
            } catch (err) {
                console.log(err);
            }
            setIsloading(false);
        }
        fetch();
    },[currUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        try {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, {email,name,newpass,confirmpass,currpass}, { withCredentials: true, headers: { Authorization: `Bearer ${token}`}})
            if(response.status===200) navigate(`/`)
        } catch (err) {
            setError(err.response.data.message);
        }
        setIsloading(false);
    }
    const updateAvatar = async () => {
        setIsAavatartouched(false);
        try {
            const avatarData = new FormData()
            avatarData.append('image', nAvatar);
            setAvatar(gif);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, avatarData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
            setAvatar(response?.data.avatar.url)
    
        } catch (err) {
            setError(err.response.data.message);
        }
    
    }
    
    if(isLoading) return <Loader/>
    
    return (
        <>
            {token ?
    
                <section className="profile">
                    <div className="container profile__container">
                        <Link to={`/myposts/${currUser?.id}`} className="btn">My posts</Link>
                        <div className="profile__details">
                            <div className="avatar__wrapper">
                                <div className="profile__avatar">
                                    <img src={avatar} alt="" />
                                </div>
    
                                <form className="avatar__form">
                                    <input type="file" name="image" id="image" accept="png, jpg, jpeg" onChange={e => setNavatar(e.target.files[0])} />
                                    <label htmlFor="image" onClick={() => setIsAavatartouched(true)}><FaEdit /></label>
                                </form>
                                {isAvatartouched && <button className="profile__avatar-btn" onClick={updateAvatar}><FaCheck /></button>}
                            </div>
    
                            <h1>{currUser?.name}</h1>
                            <form className="form profile__form" onSubmit={handleSubmit}>
                                {error && <p className="form__error">{error}</p>}
                                <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
                                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                                <input type="password" placeholder="Current password" value={currpass} onChange={e => setcurrPassword(e.target.value)} />
                                <input type="password" placeholder="New Password" value={newpass} onChange={e => setPassword(e.target.value)} />
                                <input type="password" placeholder="Confirm new password" value={confirmpass} onChange={e => setConfirmpass(e.target.value)} />
                                <button type="submit" className="btn primary ">Update details</button>
                            </form>
                        </div>
                    </div>
                </section>
                :
                <ErrorPage link="/login" linkMessage="Go to login" Message="You are not logged in" />}
        </>
    )
}
