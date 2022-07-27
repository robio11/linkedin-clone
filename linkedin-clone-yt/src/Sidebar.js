import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import './Sidebar.css';
function Sidebar() {

    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
        </div>
    )
  return (
    <div className='sidebar'>
<div className="sidebar_top">
    <img src="https://images.unsplash.com/photo-1650984625126-da298fffa4bc?ixlib=rb-1.2.1&raw_url=true&q=60&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=900" alt="" />
    <Avatar src={user.photoUrl} className='sidebar_avatar'>
        {user.email[0]} 
    </Avatar>
    <h2>{user.displayName}</h2>
    <h4>{user.email}</h4>
    <div className="sidebar_stats">
        <div className="sidebar_stat">
            <p>Who viwed you</p>
            <p className='sidebar_statNumber'>2,543</p>
        </div>
        <div className="sidebar_stat">
        <p>Viwes on post</p>
            <p className='sidebar_statNumber'>2,903</p>
        </div>
    </div>
</div>
<div className="sidebar_bottom">
    <p>Recent</p>
    {recentItem('reactjs')}
    {recentItem('programing')}
    {recentItem('softwareengg.')}
    {recentItem('design')}
    {recentItem('developer')}
</div>
    </div>
  )
}

export default Sidebar