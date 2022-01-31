import React from 'react';
import "./home.css"
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import LeftSide from '../../components/leftside/LeftSide';

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