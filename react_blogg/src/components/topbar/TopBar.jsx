import React from 'react';
import './topbar.css'

import puppy from "../../image/puppy.jpg";

function TopBar() {
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i></div>
            <div className="topCenter">
                <ul className="toplist">
                    <li className='toplist topListItem'>HOME</li>
                    <li className='toplist topListItem'>ABOUT</li>
                    <li className='toplist topListItem'>CONTACT</li>
                    <li className='toplist topListItem'>WRITE</li>
                    <li className='toplist topListItem'>LOGOUT</li>
                </ul>
            </div>
            <div className="topRight">
                <img className="topImg" src={puppy} alt="puppy" />
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    );
}

export default TopBar;