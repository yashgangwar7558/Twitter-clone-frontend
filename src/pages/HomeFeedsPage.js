import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router'
import { AiOutlineGif, AiOutlineRetweet, AiTwotoneHeart} from 'react-icons/ai';
import { CiImageOn } from 'react-icons/ci';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImStatsBars } from 'react-icons/im';
import { MdOutlineSchedule } from 'react-icons/md';
import { BiEdit, BiCommentDetail } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiShare } from 'react-icons/fi';
import './HomeFeedsPage.css'

import DesktopNavigation from '../components/DesktopNavigation';
import DesktopSidebar from '../components/DesktopSidebar';
import Cookies from 'js-cookie';

export default function HomeFeedsPage() {

    const navigate = useNavigate({});

    const [user, setUser] = useState([])
    const [tweet, setTweet] = useState("")
    const [allTweets, setAllTweets] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editTweet, setEditTweet] = useState(null)
    const yourToken = Cookies.get('jwtoken')

    const callHomeFeedsPage = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/home`, {
                method: 'GET',
                headers: { Accept: "application/json", "Content-Type": "application/json", 'Authorization': `Bearer ${yourToken}` },
                credentials: "include"
            })

            const data = await res.json();
            setUser(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }

        } catch (err) {
            console.log(err);
            navigate("/")
        }
    }

    const getAllTweets = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getweets`, {
                method: 'GET',
                headers: { Accept: "application/json", "Content-Type": "application/json", 'Authorization': `Bearer ${yourToken}` },
                credentials: "include"
            })
            const data = await res.json();
            setAllTweets(data)
            console.log(allTweets);
        } catch (err) {
            console.log(err);
            navigate("/")
        }
    }

    const getAllUsers = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getusers`, {
                method: 'GET',
                headers: { Accept: "application/json", "Content-Type": "application/json", 'Authorization': `Bearer ${yourToken}` },
                credentials: "include"
            })
            const data = await res.json();
            setAllUsers(data)
        } catch (err) {
            console.log(err);
            navigate("/")
        }
    }

    useEffect(() => {
        callHomeFeedsPage();
        getAllUsers();
        getAllTweets();
    }, [])

    const postTweet = async () => {
        try {
            const uuid = user.uuid
            const userHandle = user.user_handle
            const userName = user.display_name
            const profilePic = user.profile_pic
            let res
            if (editMode) {
                res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/editweet/${editTweet}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uuid, userName, userHandle, profilePic, tweet
                    })
                })
                setEditMode(false)
                setEditTweet(null)
            } else {
                res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/postweet`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uuid, userName, userHandle, profilePic, tweet
                    })
                })
            }
            const data = await res.json();
            console.log(data.message);
            getAllTweets();
            setTweet("")
        } catch (err) {
            console.log(err);
        }
    };

    const editItem = async (id) => {
        let newEditTweet = allTweets.find((item) => {
            return item._id === id
        })
        setTweet(newEditTweet.tweet)
        setEditMode(true)
        setEditTweet(id)
    }

    const deleteItem = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();
            console.log(data.message);
            getAllTweets();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="home-body">
            <div className="desktop-nav">
                <DesktopNavigation user={user} />
            </div>
            <div className="tweets-container">
                <div className="home">
                    <h1>Home</h1>
                </div>
                <div className="zone-tweet">
                    <img src={user.profile_pic} className="avatar-image" />
                    <div className="input-container">
                        <input type="string" className="tweet-box" placeholder="What is happening?!" maxlength="140" minlength="1" onChange={(e) => { setTweet(e.target.value) }} value={tweet} onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                postTweet();
                            }
                        }} />
                        <div className="icons">
                            <div className="left-icon">
                                <CiImageOn size={25} className='left-icon-1' />
                                <AiOutlineGif size={25} className='left-icon-1' />
                                <BsEmojiSmile size={25} className='left-icon-1' />
                                <ImStatsBars size={25} className='left-icon-1' />
                                <MdOutlineSchedule size={25} className='left-icon-1' />
                            </div>
                            <div className="right-icon">
                                <button type="submit" className="tweet-btn" onClick={() => postTweet()}>Tweet</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tweets-body">
                    {
                        allTweets.map((item) => {
                            return (
                                <div key={item.uuid} className="tweet">
                                    <img className="tweet-img-user"src={item.pic} alt="" />
                                    <div className="tweet-content">
                                        <div className="user-info">
                                            <p className="username">{item.name}</p>
                                            <span> • </span>
                                            <p className="date">
                                                {moment(item.updatedAt).fromNow()}
                                            </p>
                                        </div>
                                        <div className="tweet-body">
                                            <p>{item.tweet}</p>
                                        </div>
                                        {
                                            user.user_handle == item.user ? (
                                                <div className="buttons">
                                                    <div className="button" id="edit" onClick={() => editItem(item._id)}>
                                                        <BiEdit size={23} className="button-1" />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div className="button" id="delete" onClick={() => deleteItem(item._id)}>
                                                        <RiDeleteBinLine size={23} className="button-1" />
                                                        <span>Delete</span>
                                                    </div>
                                                    <div className="button" id="like">
                                                        <AiTwotoneHeart size={23} className="button-1" />
                                                        <span>800</span>
                                                    </div>
                                                    <div className="button" id="like">
                                                        <FiShare size={23} className="button-1" />
                                                    </div>
                                                </div>
                                            ) : (
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
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='desktop-sidebar'>
                <DesktopSidebar items={allUsers} user={user} />
            </div>
        </div>
    )
}