import React from 'react';
import "./home.css"
import Header from '../../header/Header';
import Posts from '../../posts/Posts';
import Sidebar from '../../sidebar/Sidebar';
import LeftSide from '../../leftside/LeftSide';

function Home() {
    return (
        <>
            <Header />
            <div className="home">
                <LeftSide></LeftSide>
                <Posts />
                <Sidebar />
            </div>
        </>

    );
}

export default Home;