import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router';
import { AiOutlineGif, AiOutlineRetweet, AiTwotoneHeart } from 'react-icons/ai';
import { CiImageOn } from 'react-icons/ci';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImStatsBars } from 'react-icons/im';
import { MdOutlineSchedule } from 'react-icons/md';
import { BiEdit, BiCommentDetail } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiShare } from 'react-icons/fi';
import './UserProfile.css'

import DesktopNavigation from '../components/DesktopNavigation';
import DesktopSidebar from '../components/DesktopSidebar';

export default function UserProfile() {

    const navigate = useNavigate({});

    const [user, setUser] = useState([])
    const [myTweets, setMyTweets] = useState([])
    const [myFollowingUsers, setMyFollowingUsers] = useState([])

    const callUserProfile = async (req, res) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getuser`, {
                method: 'GET',
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                credentials: "include"
            })

            const data = await res.json();
            setUser(data)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }
        } catch (err) {
            console.log(err);
            navigate("/")
        }
    }

    const getMyTweets = async () => {
        try {
            console.log(user.user_handle);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getweets/${user.user_handle}`, {
                method: 'GET',
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                credentials: "include"
            })
            const data = await res.json();
            setMyTweets(data)
        } catch (err) {
            console.log(err);
            navigate("/")
        }
    }

    const getMyFollowingUsers = async (req, res) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getusers`, {
                method: 'GET',
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                credentials: "include"
            })
            const data = await res.json();
            setMyFollowingUsers(data)
        } catch (err) {
            console.log(err);
            navigate("/")
        }
    }

    useEffect(() => {
        callUserProfile();
        getMyTweets()
        getMyFollowingUsers();
    }, [user])

    return (
        <div className='profile-body'>
            <div className="desktop-nav-1">
                <DesktopNavigation user={user} />
            </div>
            <div className="tweets-container-1">
                <div class="user-profile-container">
                    <img className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU" alt="" />
                    <div className='info'>
                        <h2>{user.display_name}</h2>
                        <h3>@{user.user_handle}</h3>
                    </div>
                    <div class="followers-following">
                        <h3>Followers: <span>150</span></h3>
                        <h3>Following: <span>68</span></h3>
                    </div>
                </div>
                <div>
                    <h2>My Tweets</h2>
                </div>
                <div>
                    {
                        myTweets.map((item) => {
                            return (
                                <div key={item.uuid} className="tweet">
                                    <img className="tweet-img-user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU" alt="" />
                                    <div className="tweet-content">
                                        <div className="user-info">
                                            <p className="username">{item.user}</p>
                                            <span> • </span>
                                            <p className="date">
                                                {moment(item.updatedAt).fromNow()}
                                            </p>
                                        </div>
                                        <div className="tweet-body">
                                            <p>{item.tweet}</p>
                                        </div>
                                        <div className="buttons">
                                            <div className="button" id="like">
                                                <BiCommentDetail size={23} className="button-1" />
                                                <span>45</span>
                                            </div>
                                            <div className="button" id="like">
                                                <AiOutlineRetweet size={23} className="button-1" />
                                                <span>200</span>
                                            </div>
                                            <div className="button" id="like">
                                                <AiTwotoneHeart size={23} className="button-1" />
                                                <span>456</span>
                                            </div>
                                            <div className="button" id="like">
                                                <FiShare size={23} className="button-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='desktop-sidebar-1'>
                <DesktopSidebar items={myFollowingUsers} user={user} />
            </div>
        </div>
    )
}