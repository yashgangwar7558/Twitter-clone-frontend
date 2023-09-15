import './DesktopSidebar.css';
import React, { useEffect, useState } from 'react'

export default function DesktopSidebar(props) {

    const {items, user} = props

    const filteredItems = items.filter((item) => item.uuid !== user.uuid);

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
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
                                            className="avatar-image"
                                            alt=""
                                        />
                                        <div className="name">
                                            <h3>{item.display_name}</h3>
                                            <h4>@{item.user_handle}</h4>
                                        </div>
                                    </div>
                                    <button className='follow-btn'>Follow</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}