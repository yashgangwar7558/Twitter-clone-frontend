import './DesktopSidebar.css';
import React, { useEffect, useState } from 'react'

export default function DesktopSidebar(props) {

    const [followingUsers, setfollowingUsers] = useState([])

    const { items, user } = props

    const filteredItems = items.filter((item) => item.uuid !== user.uuid);

    const followUser = async (item) => {
        try {

            const followed_by_id = user._id
            const followed_id = item._id
            const followed_name = item.display_name
            const followed_handle = item.user_handle
            const followed_pic = item.profile_pic

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    followed_by_id, followed_id, followed_name, followed_handle, followed_pic
                })
            })
            const data = await res.json();
            const filter = await data.map((obj) => obj.followed_id);
            console.log(filter);
            setfollowingUsers(filter)
        } catch (err) {
            console.log(err);
        }
    }

    const unfollowUser = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();
            console.log(data.message);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="sidebar-body">
            <div className="trends-container">
                <div className="trends-heading">
                    <h1>Trends for you</h1>
                </div>
                <div className="trends">
                    <span className="span1">Startups . Trending</span>
                    <p>#ivykids</p>
                    <span className="span2">82M Tweets</span>
                </div>
                <div className="trends">
                    <span className="span1">Technology . Trending</span>
                    <p>#webdev&devops is my skillset</p>
                    <span className="span2">82M Tweets</span>
                </div>
                <div className="trends">
                    <span className="span1">Technology . Trending</span>
                    <p>#srmplacements</p>
                    <span>82M Tweets</span>
                </div>
                <div className="trends">
                    <span className="span1">Politics . Trending</span>
                    <p>#indianairforceforawin</p>
                    <span className="span2">82M Tweets</span>
                </div>
                <div className="trends">
                    <span className="span1">Stocks . Trending</span>
                    <p>#newhighfornifty50</p>
                    <span className="span2">82M Tweets</span>
                </div>
                <div className="trends">
                    <span className="span1">Technology . Trending</span>
                    <p>#ivykids</p>
                    <span className="span2">82M Tweets</span>
                </div>
                <div className="trends">
                    <span className="span1">Technology . Trending</span>
                    <p>#economics</p>
                    <span className="span2">82M Tweets</span>
                </div>
            </div>
            <div className="users-container">
                <h1>Who to follow</h1>
                <div className="users-body">
                    {
                        filteredItems.map((item, index) => {
                            return (
                                <div className="user">
                                    <div className="user-box">
                                        <img
                                            src={item.profile_pic}
                                            className="avatar-image"
                                            alt=""
                                        />
                                        <div className="name">
                                            <h3>{item.display_name}</h3>
                                            <h4>@{item.user_handle}</h4>
                                        </div>
                                    </div>

                                    <button className='follow-btn' onClick={() => followUser(item)}>Follow</button>

                                    {/* <button className='follow-btn' onClick={() => unfollowUser(item._id)}>Unfollow</button> */}

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}