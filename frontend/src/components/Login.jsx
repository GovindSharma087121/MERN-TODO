import { useState } from "react";
import "../style/addTask.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("login useffect calling");
        const email = localStorage.getItem('login');
        console.log("login useffect calling email", email);

        if (email) {
            navigate('/');
        }
    })

    const handleSignin = async () => {
        const res = await fetch("http://localhost:3200/login", {
            method: 'post',
            body: JSON.stringify(userData),
            headers: { "Content-Type": "Application/Json" }
        });

        const result = await res.json();

        console.log("login API response", result);

        if (result.token && result.success) {

            document.cookie = "token=" + result.token;
            localStorage.setItem("login", userData.email);

            window.dispatchEvent(new Event("localStorage-change")); // TO FIX THE NAVBAR LOAD ISSUE JUST AFTER THE LOGIN AS LOCALSTORAGE TAKES TIME TO SET THE VALUE

            navigate("/");
        }
        else {
            alert("Something went wrong");
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <label>Email</label>
            <input type="text" name="email" onChange={(event) => setUserData({ ...userData, email: event.target.value })} placeholder="Please enter email" />
            <label>Password</label>
            <input type="password" name="password" onChange={(event) => setUserData({ ...userData, password: event.target.value })} placeholder="Please enter password" />

            <button onClick={handleSignin}>Login</button>

            <Link className="link-text" to={'/signup'}>Don't have an account? want to signup.</Link>

        </div>
    )
}

export default Login;