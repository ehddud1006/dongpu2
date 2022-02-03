import React from 'react';
import './post.css'
import { Link } from "react-router-dom"

function Post({ post }) {
    // console.log(post)
    // {_id: '61fa50c080aad9b892727d85', title: 'test', desc: 'test desc', username: 'kdyUpdated', categories: Array(0), …}categories: []createdAt: "2022-02-02T09:37:04.299Z"desc: "test desc"title: "test"updatedAt: "2022-02-02T09:37:04.299Z"username: "kdyUpdated"__v: 0_id: "61fa50c080aad9b892727d85"[[Prototype]]: Object
    // {_id: '61fa50db80aad9b892727d89', title: 'test2', desc: 'test desc', username: 'kdyUpdated', categories: Array(0), …}
    // {_id: '61fa542b80aad9b892727d8d', title: 'test3', desc: 'test desc', username: 'kdy', categories: Array(0), …}
    const PF = "http://localhost:5000/images/"
    return (
        <div className='post'>
            {post.photo && (
                <img class='postImg' src={PF + post.photo} alt="" />
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                    <span className="postTitle">{post.title}</span>
                </Link>
                {/* <hr></hr> */}
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    );
}

export default Post;