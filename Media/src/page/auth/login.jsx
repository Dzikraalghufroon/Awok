import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css'

const SignIn = () => {
    const [nama, setNama] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchredirect = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked.php`,{ withCredentials: true })
                if (response.data.status === 1) {
                    navigate('/')
                }
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchredirect();
    }, []);


    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/validation/login.php`, { nama, pass }, { withCredentials: true });
            if (response.data.status === 1) {
                setMessage('Sign-in successful!');
                setSuccess(true);
                console.log(response)
                navigate('/');
            } else {
                setMessage(response.data.message);
                console.log(response)
                setSuccess(false);
            }
        } catch (error) {
            console.error('Sign-in failed:', error);
            setMessage('Sign-in failed. Please try again.');
            setSuccess(false);
        }
    };



    return (
        <div className={styles.container_login}>
            <div>
                {/* <div className='imageContainer'>
                    <img src="" alt="Login Illustration" className='loginImage' />
                </div> */}
                <form className={styles.form} onSubmit={handleSignIn}>
                    <h2 className={styles.title}>Sign In </h2>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                    <label className={styles.label} htmlFor="pass">Password:</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            className={styles.input}
                            type={showPassword ? 'text' : 'password'}
                            id="pass"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className={styles.hide}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button className={styles.button} type="submit">Sign In</button>
                    {message && (
                        <p className={styles.message}>{message}</p>
                    )}
                </form><br /><br />
                <a className={styles.a} onClick={()=>navigate("/sign")}>don't have an account yet</a>
            </div>
        </div>
    );
};

export default SignIn;
