import './DesktopNavigation.css';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { AiFillHome } from "react-icons/ai";
import { FaHashtag, FaTwitter } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsBookmarksFill } from "react-icons/bs";
import { BiSolidMessageSquareDetail, BiSolidUser, BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router';

export default function DesktopNavigation(props) {

    const navigate = useNavigate({});

    const logoutHandler = () => {
        Cookies.remove('jwtoken');
        navigate("/")
    };

    return (
        <nav className="nav-body">

            <div className="twitter-logo">
                <FaTwitter size={45} />
            </div>

            <div className="nav-container">
                <div className="nav-button" onClick={() => { navigate("/home") }}>
                    <div>
                        <AiFillHome size={25} />
                    </div>
                    <div className="nav-button-heading">
                        <span>Home</span>
                    </div>
                </div>
                <div className="nav-button" onClick={() => { navigate("/home") }}>
                    <div>
                        <FaHashtag size={25} />
                    </div>
                    <div className="nav-button-heading">
                        <span>Explore</span>
                    </div>
                </div>
                <div className="nav-button" onClick={() => { navigate("/home") }}>
                    <div>
                        <IoNotificationsSharp size={25} />
                    </div>
                    <div className="nav-button-heading">
                        <span>Notification</span>
                    </div>
                </div>
                <div className="nav-button" onClick={() => { navigate("/home") }}>
                    <div>
                        <BiSolidMessageSquareDetail size={25} />
                    </div>
                    <div className="nav-button-heading">
                        <span>Messages</span>
                    </div>
                </div>
                <div className="nav-button" onClick={() => { navigate("/home") }}>
                    <div>
                        <BsBookmarksFill size={25} />
                    </div>
                    <div className="nav-button-heading">
                        <span>Bookmarks</span>
                    </div>
                </div>
                <div className="nav-button" onClick={() => { navigate("/profile") }}>
                    <div>
                        <BiSolidUser size={25} />
                    </div>
                    <div className="nav-button-heading">
                        <span>Profile</span>
                    </div>
                </div>
            </div>

            <div className="user-detail-box">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                    className="avatar-image"
                    alt=""
                />
                <div className="name">
                    <h3>{props.user.display_name}</h3>
                    <h4>@{props.user.user_handle}</h4>
                </div>
            </div>

            <div className="logout-container">
                <button type="submit" className="logout-btn" onClick={() => logoutHandler()}>
                    <div>
                        <BiLogOut size={20} />
                    </div>
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}