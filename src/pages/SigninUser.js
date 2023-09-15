import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import './SigninUser.css'

export default function SigninUser() {

    const navigate = useNavigate();

    const [userHandle, setUserHandle] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userHandle,
                    password
                })
            })
            
            const data = await res.json();
    
            if(res.status == 400 || !data) {
                window.alert(data.error);
            } else {
                // Cookies.set('jwtoken', data.token, { expires: 10, domain: '.onrender.com' });
                window.alert(data.message);
                navigate("/home")
            } 
        } catch(err) {
            window.alert(err)
        }
        
    }

    return (
        <div className="signin-container">
            <div className="inputs-section">
                <h2>Sign in to Twitter</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" className="signin-inputs" placeholder="Username" onChange={(e) => { setUserHandle(e.target.value) }} value={userHandle} />
                    <input type="password" className="signin-inputs" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <div className="signin-inputs-btn-container">
                        <button type="submit" className="signin-inputs-btn">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}