import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import './topbar.css'

import puppy from "../../image/puppy.jpg";
import { Context } from '../../context/Context';
function TopBar() {
    const { user, dispatch } = useContext(Context)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i></div>
            <div className="topCenter">
                <ul className="toplist">
                    <li className='toplist topListItem'>
                        <Link to="/" className='link'>
                            HOME
                        </Link>
                    </li>
                    <li className='toplist topListItem'>
                        <Link to="/" className='link'>
                            ABOUT
                        </Link>
                    </li>
                    <li className='toplist topListItem'>
                        <Link to="/" className='link'>
                            CONTACT
                        </Link></li>
                    <li className='toplist topListItem'>
                        <Link to="/write" className='link'>
                            WRITE
                        </Link></li>
                    <li className='toplist topListItem' onClick={handleLogout}>
                        {/* false 가 들어가면 LOGOUT이 생기지 않음 새로운 기법 */}
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <img className="topImg" src={puppy} alt="puppy" />
                    ) :
                        (
                            <ul className='toplist'>
                                <li className='topListItem'>
                                    <Link className="link" to="/login">LOGIN</Link>
                                </li>
                                <li className='topListItem'>
                                    <Link className="link" to="/register">REGISTER</Link>
                                </li>

                            </ul>

                        )
                }

                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div >
    );
}

export default TopBar;