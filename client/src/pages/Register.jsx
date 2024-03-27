import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpass: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const changeInputHandler = (e) => {
        setUserData(prevState => { return { ...prevState, [e.target.name]: e.target.value } })
    }

    const registerUser = async (e)=>{
        e.preventDefault();
        // setError("");
        try {
            // console.log(userData);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`,userData);
            const newUser = await response.data;
            // console.log(newUser);
            if(!newUser) setError("Couldn't registern user")

            navigate('/login')
            
        } catch (err) {
            // console.log(err);
            setError(err.response.data.message)
        }
    }

    return (
        <>
            <section className="register">
                <div className="container">
                    <h2>Sign Up</h2>
                    <form className="form register__form" onSubmit={registerUser}>
                        {error && <p className="form__error">{error}</p>}
                        <input type="text" placeholder="Full Name" name="name" value={userData.name} onChange={changeInputHandler} />
                        <input type="email" placeholder="Email" name="email" value={userData.email} onChange={changeInputHandler} />
                        <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
                        <input type="password" placeholder="Confirm Password" name="confirmpass" value={userData.confirmpass} onChange={changeInputHandler} />
                        <button type="submit" className="btn primary">Register</button>
                    </form>
                    <p className="registered text-lg">Already have an accout? <Link to="/login">Sign in</Link></p>
                </div>
            </section>
        </>
    )
}