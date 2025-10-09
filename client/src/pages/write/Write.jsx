import React, { useContext, useState } from 'react'
import "./write.css"
import axios from 'axios';
import { Context } from '../../context/Context';
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";

const Write = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)
    const handleEditorChange = (content) => {
        setDesc(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        };
        if (file) {
            const data = new FormData();
            // const filename = Date.now() + file.name;
            // data.append("name", filename);
            data.append("file", file);
            data.append("username", user.username);
            data.append("title", title);
            data.append("desc", desc);
            // newPost.photo = filename;
            try {
                await axios.post("https://ean-be-updated.vercel.app/api/upload", data);
            } catch (error) {

            }
        }
        else {
            try {
                await axios.post('https://ean-be-updated.vercel.app/api/posts', newPost);
                window.location.replace("/");
            } catch (error) {

            }
        }
        window.location.replace("/");

    }

    return (
        <>
            <div className='write'>
                {file && (
                    <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
                )}
                <form className='writeForm' onSubmit={handleSubmit}>
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="writeIcon bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <input type="text"
                            placeholder='Title'
                            className='writeInput titlestyle'
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="writeFormGroup">
                        {/* <textarea placeholder='Tell your story...'
                            type="text"
                            className='writeInput writeText'
                            onChange={e => setDesc(e.target.value)}
                            required>
                        </textarea> */}
                        <ReactQuill
                            value={desc}
                            onChange={(content) => {
                                handleEditorChange(content);
                            }}
                            className='writeInput writeText'
                        />
                    </div>
                    <button className="writeSubmit" type='submit'>Publish</button>
                </form>
            </div>
        </>
    )
}

export default Write
