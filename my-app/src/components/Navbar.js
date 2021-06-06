import React from 'react'
import navlogo from '../images/github.png';
import '../scss/reset.css';
import "../scss/theme.css";
import {  Link } from "react-router-dom";
export default function Navbar(props) {
    function logout(){
        console.log("logout");
        props.setstatus(false);
    }
    return (
        <>
        
        <div className="navbar profile-nav">
            <figure>
                <img src={navlogo} alt="navlogo" />
            </figure>
            {!props.loggedin?
            <div>
                <Link to="/">
                <button className="accent-button">Login</button>
                </Link>
                <Link to="/signup">
                <button>SignUp</button>
                </Link>
            </div>:
            <div>
            
            <button className="accent-button" onClick={logout}>Logout</button>
            
            
            </div>
            }
        </div>
        
        </>
    )
}
