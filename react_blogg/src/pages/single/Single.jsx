import React from 'react';
import LeftSide from '../../components/leftside/LeftSide';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';
import "./single.css"

function Single() {
    return (
        <div className='single'>
            {/* <LeftSide></LeftSide> */}
            <SinglePost></SinglePost>
            <Sidebar></Sidebar>
        </div>
    );
}

export default Single;