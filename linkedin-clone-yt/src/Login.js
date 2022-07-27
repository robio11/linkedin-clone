import React, { useState } from 'react'
import './Login.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './features/counter/userSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState();
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch();

    const loginToAdd = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                // Signed in 
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    profileUrl: userAuth.user.photoUrl,
                }))
                // ...
            })
            .catch((error) => alert(error));
    };

    const register = () => {
        // e.preventDefault();
        if (!name) {
            return alert('Please enter a full name');
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                // Signed in 
                userAuth.user.updateProfile({
                    name: name,
                    photoURL: profilePic,
                })
                    // ...
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName:name,
                            photoUrl: profilePic,
                        }))
                    })
                    .catch((error) => alert(error.message));
            })


    };

    return (
        <div className='login'>
            <img src="https://www.socialmediabutterflyblog.com/wp-content/uploads/sites/567/2019/02/linkedin.jpg" alt="" />
            <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Full name (required if registering)' type="text" />
                <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type="text" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" />
                <button type='submit' onClick={loginToAdd} >Sign in</button>
            </form>
            <p>Not a member?
                <span className='login_register' onClick={register} >Register Now</span>
            </p>
        </div>
    )
}

export default Login