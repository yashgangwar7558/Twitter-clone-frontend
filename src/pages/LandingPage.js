import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './LandingPage.css'

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="landing-container">
            <div className="left-section">
                <img src="https://img.freepik.com/free-vector/colorful-icons-set-concept_79603-1267.jpg?size=626&ext=jpg" className="left-section-img" />
            </div>
            <div className="right-section">
                <h1>Happening now</h1>
                <h2>Join today.</h2>
                <button type="submit" className="create-acc-btn" onClick={() => { navigate("/signup") }}>Create account</button>
                <hr></hr>
                <div>
                    <h3>Already have an account?</h3>
                    <button type="submit" className="landing-signin-btn" onClick={() => { navigate("/signin") }}>Sign in</button>
                </div>
            </div>
        </div>
    )
}