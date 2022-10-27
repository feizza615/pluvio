import React, { useEffect, useState } from 'react'
import Card from '../../components/Card';
import "styled-components";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from 'axios';
import { Avatar, Skeleton } from '@mui/material';
import ButtonComponent from '../../components/LoginComponent/ButtonComponent';
import CircularProgress from '@mui/material/CircularProgress';

export const FriendBox = ({user, isAdded}) => {
  const currentUser = useSelector(selectUser);

  const handleClick = (e, friend) => {
    e.preventDefault();

    const name = currentUser.name;

    const configuration = {
      method: "post",
      url:  "http://localhost:5001/users/friends",
      data: {
        name,
        friend
        },             
       };
    axios(configuration)
    .then((result) =>
    {
      console.log(result);
      alert(`Added ${friend}`)
    })
    .catch((error) => {
      error = new Error();
    });
    window.location.reload(false);
  }

  return (<Card>
    <div style={{display: "flex", justifyContent:"space-between",alignItems: "center"}}>
      <div style={{display: "flex",alignItems: "center",gap:"20px"}}>
        <Avatar sx={{width: "75px", height: "75px", bgcolor: (user.color ? user.color : "#"+Math.floor(Math.random()*16777215).toString(16)),fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{user.name[0]}</Avatar>
        <p style={{ fontSize: "25px", margin: 0}}>@{user.name}</p>
      </div>
      {isAdded? <></>: <ButtonComponent onClick={(e) => handleClick(e,user.name)}>FOLLOW</ButtonComponent>}
    </div>
  </Card>);
}

const FriendsPage = () => {
  const [users, setUsers] = useState([])
  const [addedUsers, setAddedUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  const currentUser = useSelector(selectUser);

  useEffect(()=> {
    axios
      .get('http://localhost:5001/users')
      .then( response => {
          setUsers(response.data);
          console.log(response.data)
        }
      )

      axios
      .get(`http://localhost:5001/users/friendsid/${currentUser.name}`)
      .then( response => {
          setAddedUsers(response.data);
          console.log(response.data)
          setLoading(false)
        }
      )
  },[])

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
      <h1>Following</h1>
      {!loading && users && addedUsers ? users.filter(user => user.name !== currentUser.name && addedUsers.includes(user.name)).map((added, x)=> 
      <Card>
        <div style={{display: "flex", justifyContent:"space-between",alignItems: "center"}}>
          <div style={{display: "flex",alignItems: "center",gap:"20px"}}>
            <Avatar sx={{width: "75px", height: "75px", bgcolor: (added.color ? added.color : "#"+Math.floor(Math.random()*16777215).toString(16)),fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{added.name[0]}</Avatar>
            <p style={{ fontSize: "25px", margin: 0}}>@{added.name}</p>
          </div>
          <ButtonComponent>VIEW</ButtonComponent>
        </div>
      </Card>) : <div style={{display:"flex",justifyContent:"center"}}><CircularProgress /></div>}
      <h1>Other Users</h1>
      {!loading && users && addedUsers ? users.filter(user => user.name !== currentUser.name && !addedUsers.includes(user.name)).map((user, x) => 
      <FriendBox key={x} user={user}/>) : <div style={{display:"flex",justifyContent:"center"}}><CircularProgress /></div>}
    </div>
  )
}

export default FriendsPage;