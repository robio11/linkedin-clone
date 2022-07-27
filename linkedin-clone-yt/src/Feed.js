// import React from 'react'
import { useEffect, useState} from 'react';
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import {db} from './firebase';
import { addDoc,collection ,query,onSnapshot,Timestamp, orderBy} from 'firebase/firestore';
import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query (collection(db,'posts'),orderBy('timestamp','desc'));
    onSnapshot (q,(snapshot) => setPosts(snapshot.docs.map(doc => ({
       id:doc.id,
       data:doc.data(),
     }))))
  },[])
 
  const sendPost = async(e) => {
    e.preventDefault();
    await addDoc (collection(db,'posts'),{
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl:user.photoUrl || '',
      timestamp: Timestamp.fromDate(new Date()),
    })
  }

  return (
    <div className='feed'>
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form>
            <input value={input} onChange={e => setInput(e.target.value)} type="text" />
            <button onClick={sendPost} type='submit'>Send</button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title='Photo' color="#70b5f9" />
          <InputOption Icon={SubscriptionsIcon} title='Video' color="#e7a33e" />
          <InputOption Icon={EventNoteIcon} title='Event' color="#c0cbcd" />
          <InputOption Icon={CalendarViewDayIcon} title='Write article' color="#7fc15e" />
        </div>
      </div>
      <FlipMove>
      {posts.map(({id,data:{name,description,message,photoUrl}}) => (
        <Post
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}
        />
      ))}
      </FlipMove>
    </div>
  )
}

export default Feed