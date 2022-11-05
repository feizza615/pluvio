<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { Avatar, Skeleton } from "@mui/material";
import ButtonComponent from "../../components/LoginComponent/ButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

export const FriendBox = ({ user, isAdded }) => {
=======
import React, { Component, useEffect, useState } from 'react'
import Card from '../../components/Card';
import "styled-components";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from 'axios';
import { Avatar, Skeleton, Grid } from '@mui/material';
import ButtonComponent from '../../components/LoginComponent/ButtonComponent';
import CircularProgress from '@mui/material/CircularProgress';
import {io} from "socket.io-client"

let socket;

function callSocket(sockets){
  socket = sockets;
}

export const FriendBox = ({user, isAdded, added}) => {
  
>>>>>>> 106f13249a1a10b248ad7b9b3ab88836fab175ad
  const currentUser = useSelector(selectUser);

// console.log("Current User: " + currentUser.name)

  const handleClick = (e, friend) => {
    e.preventDefault();
    const name = currentUser.name;

    socket.emit("sendNotification", {
      senderName: name,
      receiverName: friend, 
      type: 1
    })
   

    const configuration = {
      method: "post",
      url: "http://localhost:5001/users/friends",
      data: {
        name,
        friend,
      },
    };
    axios(configuration)
<<<<<<< HEAD
      .then((result) => {
        console.log(result);
        alert(`Added ${friend}`);
      })
      .catch((error) => {
        error = new Error();
      });
    window.location.reload(false);
  };

  return (
    <Card>
      <ResponsiveContainer
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Avatar
            sx={{
              width: "75px",
              height: "75px",
              bgcolor: user.color
                ? user.color
                : "#" + Math.floor(Math.random() * 16777215).toString(16),
              fontSize: "36px",
              fontFamily: "Poppins",
              fontWeight: 800,
            }}
          >
            {user.name[0]}
          </Avatar>
          <div>
            <p style={{ fontSize: "25px", margin: 0 }}>@{user.name}</p>
            <p style={{ fontSize: "12px" }}>{user.about}</p>
          </div>
        </div>
        {isAdded ? (
          <></>
        ) : (
          <ButtonComponent onClick={(e) => handleClick(e, user.name)}>
            FOLLOW
          </ButtonComponent>
        )}
      </ResponsiveContainer>
    </Card>
  );
};

export const ResponsiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    gap: 15px;

    &:nth-child(2): {
      float: right;
    }
  };
`;

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

=======
    .then((result) =>
    {
      console.log("result");
      
      alert(`Added ${friend}`)
      
    })
    .catch((error) => {
      error = new Error();
    });
 

   
      
      window.location.reload(false);
    
  // handleSocket(socket);

  }

  return (<Card style={{marginBottom:"5px"}}>
    <div style={{display: "flex", justifyContent:"space-between",alignItems: "center"}}>
      <div style={{display: "flex",alignItems: "center",gap:"20px"}}>
        <Avatar sx={{width: "75px", height: "75px", bgcolor: '#'+Math.floor(Math.random()*16777215).toString(16),fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{user.name[0]}</Avatar>
        <p style={{ fontSize: "20px", margin: 0}}>@{user.name}</p>
      </div>
      {isAdded? <></>: <ButtonComponent onClick={(e) => handleClick(e,user.name)} style={{width:"100px"}}>FOLLOW</ButtonComponent>}
    </div>
  </Card>);
}

const FriendsPage = () => {
  const [users, setUsers] = useState([])
  const [addedUsers, setAddedUsers] = useState([])
  const [loading, setLoading] = useState(true)
>>>>>>> 106f13249a1a10b248ad7b9b3ab88836fab175ad
  const currentUser = useSelector(selectUser);
  const [followedUsers, setFollowedUsers] = useState([])
  const [followerLoading, setFollowerLoading] = useState(true)
  const mappedUsers = addedUsers.map((data) => data);
  let sizeOfUser = mappedUsers.length;
  

  console.log(" size: " + sizeOfUser)

<<<<<<< HEAD
  useEffect(() => {
    axios.get("http://localhost:5001/users").then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
=======
  useEffect(()=> {
    axios
      .get('http://localhost:5001/users')
      .then( response => {
          setUsers(response.data);
          console.log("size of set: " +setAddedUsers.length)

          // console.log(response.data)
        }
      )
>>>>>>> 106f13249a1a10b248ad7b9b3ab88836fab175ad

    axios
      .get(`http://localhost:5001/users/friendsid/${currentUser.name}`)
<<<<<<< HEAD
      .then((response) => {
        setAddedUsers(response.data);
        console.log(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1>Following</h1>
      {!loading && users && addedUsers ? (
        users
          .filter(
            (user) =>
              user.name !== currentUser.name && addedUsers.includes(user.name)
          )
          .map((added, x) => (
            <Card>
              <ResponsiveContainer
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px",}}
                >
                  <Avatar
                    sx={{
                      width: "75px",
                      height: "75px",
                      bgcolor: added.color
                        ? added.color
                        : "#" +
                          Math.floor(Math.random() * 16777215).toString(16),
                      fontSize: "36px",
                      fontFamily: "Poppins",
                      fontWeight: 800,
                    }}
                  >
                    {added.name[0]}
                  </Avatar>
                  <div>
                    <p style={{ fontSize: "25px", margin: 0 }}>@{added.name}</p>
                    <p style={{ fontSize: "12px", maxWidth: "300px"}}>{added.about}</p>
                  </div>
                </div>
                <ButtonComponent>VIEW</ButtonComponent>
              </ResponsiveContainer>
            </Card>
          ))
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
      <h1>Other Users</h1>
      {!loading && users && addedUsers ? (
        users
          .filter(
            (user) =>
              user.name !== currentUser.name && !addedUsers.includes(user.name)
          )
          .map((user, x) => <FriendBox key={x} user={user} />)
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
=======
      .then( response => {
          setAddedUsers(response.data);
          console.log("size: " +setAddedUsers.length)
          console.log(response.data)
          setLoading(false)
        }
      )

      const configurationfollowers = {
        method: "get",
        url: "http://localhost:5001/users/followers/"+currentUser.name,       
      };
      axios(configurationfollowers)
      .then((response) => {
        
        // for(let i = 0; i < response.data.length; i++){
        //   // console.log("Setting follower: " + response.data[i].name)
        //   // det.push(response.data[i].name)
        //   console.log("Followers: " + response.data[i].name)
        // console.log(response.data[i])
        setFollowedUsers(response.data)
        setFollowerLoading(false)
        // }
        
      })

  },[])

  
  if(sizeOfUser === 1){}
  return ( 
    <>    
   
    <div style={{gap: "20px"}}>
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
            <Grid container  spacing={3}>
          <Grid key={1} item >
       <div >
      <Card style={{height:"450px", overflowY:"scroll"}} className="contentsList">
      <h2>Following</h2>
      {!followerLoading && users && addedUsers ? addedUsers.map((added, x)=> 
      <div style={{display: "flex", justifyContent:"space-between",alignItems: "center"}}>
      <div style={{display: "flex",alignItems: "center",gap:"20px"}}>
            <Avatar sx={{marginTop:"15px", width: "60px", height: "60px", bgcolor: '#'+Math.floor(Math.random()*16777215).toString(16),fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{added[0]}</Avatar>
            <p style={{ fontSize: "20px", marginRight:"15px"}}>@{added}</p>
          </div>
          <ButtonComponent style={{width:"80px"}}>VIEW</ButtonComponent>
      </div>) : <div style={{display:"flex",justifyContent:"center"}}><CircularProgress /></div>}
      </Card>
      </div>
      </Grid>
      <Grid key={2} item >
      <Card style={{minWidth: 330, height:"450px", overflowY:"scroll"}} className="contentsList">
      <h2>Followers</h2>
      {!followerLoading && followedUsers ? followedUsers.map((followed)=>
      <div>
      <div style={{display: "flex", justifyContent:"space-between",alignItems: "center"}}>
          <div style={{display: "flex",alignItems: "center",gap:"20px"}}>
          <Avatar sx={{marginTop:"15px", width: "60px", height: "60px", bgcolor: '#'+Math.floor(Math.random()*16777215).toString(16),fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{followed.name[0]}</Avatar>
            <p style={{ fontSize: "20px", margin: 0}}>{followed.name}</p>
          </div>
        </div>
      </div>): <div style={{display:"flex",justifyContent:"center"}}><CircularProgress /></div>}
      </Card>
      </Grid>
      </Grid>
      </Grid>
    </Grid>

      <h2>Other Users</h2>
      {!loading && users && addedUsers ? users.filter(user => user.name !== currentUser.name && !addedUsers.includes(user.name)).map((user, x) => 
      <FriendBox key={x} user={user} added={mappedUsers[sizeOfUser]} socket={socket} />) : <div style={{display:"flex",justifyContent:"center"}}><CircularProgress /></div>}
    </div>
    <div style={{marginLeft:"5px"}}>
      
      </div>
    </>
  )
}
export default FriendsPage;

export const Tester=({socket})=>{
  callSocket(socket);
  return (<></>)
}
>>>>>>> 106f13249a1a10b248ad7b9b3ab88836fab175ad
