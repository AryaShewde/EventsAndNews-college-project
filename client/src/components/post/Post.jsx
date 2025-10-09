import React from 'react'
import "./post.css"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
    // const PF = "https://eventsandnewsapi.onrender.com/images/"
    const processLinks = (html) => {
        return html.replace(/href="(?!https?:\/\/)([^"]*)"/g, 'href="https://$1"');
    };
    const safeHtmlContent = processLinks(post.desc);
    return (
        <div className='post'>
            {post.photo && (
                <Link to={`/post/${post._id}`} className='link'><img className='postImg' src={post.photo} alt="" /></Link>
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className='postDate'>Posted On : {new Date(post.createdAt).toDateString()}</span>
            </div>

            {/* <p className='postDesc'>{post.desc}</p> */}
            <p className='postDesc' dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
        </div>
    )
}

export default Post
