import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./singlePost.css"

function SinglePost() {
    const location = useLocation()
    console.log(location)
    // {pathname: '/post/61fa50c080aad9b892727d85', search: '', hash: '', state: undefined, key: 'hoplyg'}
    console.log(location.pathname.split("/")[2])
    // 61fa50c080aad9b892727d85
    const path = location.pathname.split("/")[2]
    // console.log("http://localhost:3000")
    const [post, setPost] = useState({})
    console.log(post)
    const PF = "http://localhost:5000/images/"
    const { user } = useContext(Context)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://localhost:3000/api/posts/` + path)
            console.log(res)
            setPost(res.data)
            // console.log(post)
        }
        getPost()
    }, [path])
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${post._id}`, { data: { username: user.username } })
            window.location.replace("http://localhost:3000");
        } catch (err) {


        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                )}
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className='singlePostDesc'>
                    {post.desc}
                </p>
            </div>
        </div >
    );
}

export default SinglePost;