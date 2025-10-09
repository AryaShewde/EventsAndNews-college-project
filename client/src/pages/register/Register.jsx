import React, { useState } from 'react'
import "./register.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            const res = await axios.post("https://ean-be-updated.vercel.app/api/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login");
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    aria-label="Username"
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    className='registerInput'
                    placeholder='Enter your Username...'
                    required
                />
                <label>Email</label>
                <input
                    aria-label="Email"
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    className='registerInput'
                    placeholder='Enter your email...'
                    required
                />
                <label>Create Password</label>
                <input
                    aria-label="Password"
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className='registerInput'
                    placeholder='Enter your password...'
                    required
                />
                <button type='submit' className='registerButton'>Register</button>
            </form>
            <button className='registerLoginButton'>
                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>Login</Link>
            </button>
            {error && <span role="alert" style={{ color: "red", marginTop: "10px" }}>Something went wrong</span>}
        </div>
    )
}

export default Register
