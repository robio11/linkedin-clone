import React, { useEffect } from 'react';
import './App.css';
import Feed from './Feed';
import Header from './Header';
import Sidebar from './Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {logout,login, selectUser} from './features/counter/userSlice';
import Login from './Login';
import {auth} from './firebase';
import {onAuthStateChanged} from 'firebase/auth';
import Widgets from './Widgets';

function App() {

  const user  = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // ...
          dispatch(login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName:userAuth.displayName,
            photoUrl:userAuth.profilePic,
        }))
      } else {
        // User is signed out
        // ...
        dispatch(logout());
      }
    });
  },[dispatch])

  return (
    <div className="app">
     <Header/>
     {!user ? (
       <Login/>
     ):(
     <div className="app_body">
     <Sidebar/>
     <Feed/>
     <Widgets/>
     </div>
     )}
    </div>
  );
}

export default App;
