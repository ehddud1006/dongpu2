import React from 'react';
import './topBar.css'

function TopBar() {
    return (
        <>
            <div className="top">
                <div className="topLeft">
                </div>
                <div className="topCenter">
                    동영타 전체 랭킹
                </div>
                <div className="topRight">
                    전체
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
                    전체
                </div>
            </div>
            <div className="grayBar" >
            </div>
        </>
    );
}

export default TopBar;