import { useState } from "react";
import "../style/addTask.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('login')) { navigate('/') }
    })

    const handleSignup = async () => {
        console.log(userData);

        const result = await fetch("http://localhost:3200/signup", {
            method: 'post',
            body: JSON.stringify(userData),
            headers: { "Content-Type": "Application/Json" }
        });
        const res = await result.json();

        if (res || res.success) {
            document.cookie = "token=" + res.token; // TO ADD TOKEN IN THE COOKIES

            localStorage.setItem("login", userData.email);

            navigate('/');
        }
        else {
            alert("something went wrong");
        }

        console.log("signup result", res);
    }

    return (
        <div className="container">
            <h1>Signup</h1>
            <label>Name</label>
            <input type="text" name="name" onChange={(event) => setUserData({ ...userData, name: event.target.value })} placeholder="Please enter name" />
            <label>Email</label>
            <input type="text" name="email" onChange={(event) => setUserData({ ...userData, email: event.target.value })} placeholder="Please enter email" />
            <label>Password</label>
            <input type="password" name="password" onChange={(event) => setUserData({ ...userData, password: event.target.value })} placeholder="Please enter password" />

            <button onClick={handleSignup}>Signup</button>

            <Link className="link-text" to={'/login'}>Already have an account? want to login.</Link>
        </div>
    )
}

export default Signup;