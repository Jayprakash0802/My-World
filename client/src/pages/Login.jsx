import { useContext, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../context/userContext";

export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")

    const navigate = useNavigate()
    const {setCurruser} = useContext(UserContext)

    const changeInputHandler = (e) => {
        setUserData(prevState => { return { ...prevState, [e.target.name]: e.target.value } })
    }
    const LoginUser = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userData);
            // console.log(response);
            const user = await response?.data
            setCurruser(user)
            navigate(`/`)
            
        } catch (err) {
            // console.log(err.response.data.message)
            setError(err.response.data.message);
            // console.log(error);
        }
    }

    return (
        <>
            <section className="login">
                <div className="container">
                    <h2>Sign In</h2>
                    <form className="form login__form" onSubmit={LoginUser}>
                        {error && <p className="form__error">{error}</p>}
                        <input type="email" placeholder="Email" name="email" value={userData.email} onChange={changeInputHandler} autoFocus/>
                        <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
                        <button type="submit" className="btn primary">Login</button>
                    </form>
                    <p className="registered text-lg">Don't have an account? <Link to="/login">Sign Up</Link></p>
                </div>
            </section>
        </>
    )
}