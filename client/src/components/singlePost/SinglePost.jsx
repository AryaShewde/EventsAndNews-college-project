import React, { useContext, useEffect, useState } from 'react'
import "./singlePost.css"
import { useLocation } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";

const SinglePost = () => {
    const navigate = useNavigate();
    const { user } = useContext(Context)
    // const PF = "https://eventsandnewsapi.onrender.com/images/"
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const handleEditorChange = (content) => {
        setDesc(content);
    };
    const processLinks = (html) => {
        return html.replace(/href="(?!https?:\/\/)([^"]*)"/g, 'href="https://$1"');
    };
    const safeHtmlContent = processLinks(desc);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("https://ean-be-updated.vercel.app/api/posts/" + path);
            setPost(res.data)
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete(`https://ean-be-updated.vercel.app/api/posts/${post._id}`, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (error) { }
    }
    const handleUpdate = async () => {
        try {
            await axios.put(`https://ean-be-updated.vercel.app/api/posts/${post._id}`, {
                username: user.username, title, desc
            });
            setUpdateMode(false)
            window.location.replace("/");
        } catch (error) { }
    }

    return (
        <>
            <div className='singlePost'>
                <button onClick={() => navigate(-1)} className='backbutton'><IoMdArrowRoundBack className='arrow' /></button>
                <div className="singlePostWrapper">
                    {post.photo && (
                        <img src={post.photo} alt="" className="singlePostImg" />
                    )}
                    {
                        updateMode ? (<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='singlePostTitleInput' autoFocus />) : (
                            <h1 className="singlePostTitle">
                                {title}
                                {post.username === user?.username && (
                                    <div className="singlePostEdit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="singlePostIcon bi bi-pencil-square" viewBox="0 0 16 16" onClick={() => setUpdateMode(true)}>
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="singlePostIcon bi bi-trash3-fill" viewBox="0 0 16 16" onClick={handleDelete}>
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </div>
                                )}
                            </h1>
                        )
                    }
                    <div className='singlePostInfo'>
                        <span className='singlePostAuthor'>Author:
                            <Link className='link' to={`/?user=${post.username}`}>
                                <b>{post.username} </b>
                            </Link>
                        </span>
                        <span className='singlePostDate'>Posted On : {new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {updateMode ? (
                        // <textarea value={desc} className='singlePostDescInput' onChange={(e) => setDesc(e.target.value)} />
                        <ReactQuill
                            value={desc}
                            onChange={(content) => {
                                handleEditorChange(content);
                            }}
                            className='writeInput writeText'
                        />
                    ) : (
                        <p className='singlePostDesc' dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
                    )}
                    {updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default SinglePost
