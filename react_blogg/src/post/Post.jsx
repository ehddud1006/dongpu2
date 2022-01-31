import React from 'react';
import './post.css'

function Post() {
    return (
        <div className='post'>
            <img class='postImg' src="https://img.animalplanet.co.kr/news/2020/07/15/700/e05t9x1o0e3trklpwrr3.jpg" alt="" />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">Lorem ipsum dolor sit amet cous atque co.</span>
                <hr></hr>
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, Consequun libero quisquam sit, omnis incidunt aut non illo ad optio ut debitis earum sapiente excepturi ullam itaque ratione dolor ducimus assumenda Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, libero quisquam sit, omnis incidunt aut non illo ad optio.
            </p>
        </div>
    );
}

export default Post;