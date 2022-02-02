import React from 'react';
import "./home.css"
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import LeftSide from '../../components/leftside/LeftSide';
import axios from "axios"
import { useState, useEffect } from "react";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
function Home() {
    const [posts, setPosts] = useState([]);
    // const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("api/posts");
            console.log(res);
        };
        fetchPosts();
    }, []);
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    );
}

export default Home;