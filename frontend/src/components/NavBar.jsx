import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css"
import { useState } from "react";
import { useEffect } from "react";

const NavBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login'));

    const navigate = useNavigate();

    const logOut = () => {
        console.log("logout function called");
        setIsLoggedIn(null);
        localStorage.removeItem('login');
        setTimeout(() => {
            navigate('/login');
        }, 0)
    }

    // TO FIX THE NAVBAR LOAD ISSUE DUE TO DELAY IN THE SETTING DATA IN THE LOCALSTORAGE JUST AFTER THE LOGIN
    useEffect(() => {
        const handleStorage = () => {
            setIsLoggedIn(localStorage.getItem('login'));
        }

        window.addEventListener("localStorage-change", handleStorage);

        return () => {
            window.removeEventListener('localStorage-change', handleStorage);
        }
    }, [])


    console.log("isLoggedIn", isLoggedIn);
    return (
        <nav className="navbar">
            <div className="logo">To Do App</div>

            {isLoggedIn ?
                <ul className="nav-links">
                    <li><Link to="/">List</Link></li>
                    <li><Link to="/add">Add Task</Link></li>
                    <li><Link onClick={logOut}>Logout</Link></li>
                </ul>
                : null
            }
        </nav>
    )
};

export default NavBar;