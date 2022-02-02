import React from 'react';
import "./singlePost.css"
function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <b>DongYoung</b></span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>
                <p className='singlePostDesc'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis adipisci earum nam et explicabo quia! Vero eius temporibus praesentium voluptatum sint quia officia atque, voluptatibus esse, maxime, quam deleniti.
                </p>
            </div>
        </div >
    );
}

export default SinglePost;