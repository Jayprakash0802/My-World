import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { VscThreeBars } from "react-icons/vsc";
import { Logo } from "../assets/logo";
import { useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";

export default function Header() {
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 900 ? true : false);
    const { currUser } = useContext(UserContext)
    const [user,setUser] = useState(null);
    const [avatar,setAvatar] = useState("");

    useEffect(()=>{
        const fetch = async()=>{
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currUser?.id}`)
            } catch (error) {
                console.log(error);
            }
        }
    },[currUser])

    const navHandler = () => {
        if (window.innerWidth < 900) setIsNavShowing(false);
        else setIsNavShowing(true);
    }

    return (
        <nav>
            <div className="container nav__container bg-black ">
                <Link className="nav__logo" onClick={navHandler} to="/">
                    <img src={Logo} alt="" />
                </Link>
                {currUser ? isNavShowing && <ul className="nav__menu ">
                    <li><Link to={`/myposts/${currUser?.id}/`} onClick={navHandler}>Dashboard</Link></li>
                    <li><Link to={`/profile/${currUser?.id}/`} onClick={navHandler}>UpdateInfo</Link></li>
                    <li><Link to="/create" onClick={navHandler}>Create Post</Link></li>
                    <li><Link to="/authors" onClick={navHandler}>Authors</Link></li>
                    <li><Link to="/logout" onClick={navHandler}>Logout</Link></li>
                </ul> : isNavShowing && <ul className="nav__menu ">
                    <li><Link to="/" onClick={navHandler}>Posts</Link></li>
                    <li><Link to="/authors" onClick={navHandler}>Authors</Link></li>
                    <li><Link to="/login" onClick={navHandler}>Login</Link></li>
                </ul>}
                <button className="nav__toggle-btn" id="navbtn" onClick={() => (setIsNavShowing(!isNavShowing))}>
                    {isNavShowing ? <AiOutlineClose /> : <VscThreeBars />}
                </button>
                
            </div>
        </nav>
    )
}