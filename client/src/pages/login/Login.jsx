import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "./login.css";
import { Context } from '../../context/Context';
import axios from 'axios';

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);
    const { dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post('https://ean-be-updated.vercel.app/api/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            window.location.replace("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            setError(true);
        }
    };

    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className='loginForm' onSubmit={handleSubmit} data-testid="login-form">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    className='loginInput'
                    placeholder='Enter your username...'
                    ref={userRef}
                    required
                    aria-label="Username"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    className='loginInput'
                    placeholder='Enter your password...'
                    ref={passwordRef}
                    required
                    aria-label="Password"
                />

                <button type="submit" className='loginButton' aria-label="Login">Login</button>
            </form>

            <button className='loginRegisterButton'>
                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }} aria-label="Register">Register</Link>
            </button>

            {error && <span role="alert" style={{ color: "red" }}>Invalid Credentials. Try Again</span>}
        </div>
    );
};

export default Login;
