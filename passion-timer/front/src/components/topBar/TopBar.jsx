import React from 'react';
import './topBar.css'
import { Link } from "react-router-dom";


function TopBar({ category }) {
    // console.log(category)
    return (
        <>
            <div className="top">
                <div className="topLeft">
                    <Link
                        to="/study"
                        className="btn"
                    >
                        공부하기
                    </Link>
                </div>
                <div className="topCenter">
                    동영타 {category} 랭킹
                </div>
                <div className="topRight">
                    <Link
                        to="/signIn"
                        className="btn"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
            <div className="dateType">
                <div className="topLeft">
                </div>
                <div className="topCenter ">
                    <ul className="toplist">
                        <li className='toplist topListItem'>
                            일간
                        </li>
                        <li className='toplist topListItem'>
                            주간
                        </li>
                        <li className='toplist topListItem'>
                            월간
                        </li>
                    </ul>
                </div>
                <div className="topRight">

                </div>
            </div>
            <div className="grayBar" >
            </div>
        </>
    );
}

export default TopBar;