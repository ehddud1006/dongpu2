import React from 'react';
import "./home.css"
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import LeftSide from '../../components/leftside/LeftSide';
import axios from "axios"
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// import { search } from '../../../../api/routes/auth';

function Home() {
    const [posts, setPosts] = useState([]);
    // const { search } = useLocation();
    const { search } = useLocation()
    // console.log(search)
    // console.log(location)
    // http://localhost:3000/posts/?user=kdyUpdated
    // {pathname: '/posts/', search: '?user=kdyUpdated', hash: '', state: undefined}
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:3000/api/posts" + search);
            // console.log(res)
            setPosts(res.data);
            // {data: Array(3), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
            // config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
            // data: (3) [{…}, {…}, {…}]
            // headers: {content-length: '581', content-type: 'application/json; charset=utf-8', date: 'Wed, 02 Feb 2022 21:56:18 GMT', etag: 'W/"245-nGaT93/POQnKQsl7TaP5icxjyF8"', x-powered-by: 'Express'}
            // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
            // status: 200
            // statusText: "OK"
            // [[Prototype]]: Object
        };
        fetchPosts();
    }, [search]);
    return (
        <>
            <Header />
            <div className="home">
                <LeftSide></LeftSide>
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    );
}

export default Home;