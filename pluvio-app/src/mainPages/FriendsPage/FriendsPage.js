import React, { Component, useEffect, useState } from "react";
import Card from "../../components/Card";
import "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { Avatar, Skeleton, Grid, Button } from "@mui/material";
import ButtonComponent from "../../components/LoginComponent/ButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { io } from "socket.io-client";
import { NavLink } from 'react-router-dom';

let socket;

function callSocket(sockets) {
  socket = sockets;
}

export const FriendBox = ({ user, isAdded, added }) => {
  const currentUser = useSelector(selectUser);

  // console.log("Current User: " + currentUser.name)

  const handleClick = (e, friend) => {
    e.preventDefault();
    const name = currentUser.name;

    socket.emit("sendNotification", {
      senderName: name,
      receiverName: friend,
      type: 1,
    });

    const configuration = {
      method: "post",
      url: "http://localhost:5001/users/friends",
      data: {
        name,
        friend,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log("result");

        alert(`Added ${friend}`);
      })
      .catch((error) => {
        error = new Error();
      });

    window.location.reload(false);

    // handleSocket(socket);
  };

  
  return (
    <Card style={{ marginBottom: "5px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Avatar
            sx={{
              width: "75px",
              height: "75px",
              bgcolor: "#" + Math.floor(Math.random() * 16777215).toString(16),
              fontSize: "36px",
              fontFamily: "Poppins",
              fontWeight: 800,
            }}
          >
            {user.name[0]}
          </Avatar>
          <NavLink style={{textDecoration: "None"}} to={"/profile/"+user.name}><p style={{ fontSize: "20px", margin: 0, color: "white"}}>@{user.name}</p></NavLink>
        </div>
        {isAdded ? (
          <></>
        ) : (
          <ButtonComponent
            onClick={(e) => handleClick(e, user.name)}
            style={{ width: "100px" }}
          >
            FOLLOW
          </ButtonComponent>
        )}
      </div>
    </Card>
  );
};

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(selectUser);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [followerLoading, setFollowerLoading] = useState(true);
  const mappedUsers = addedUsers.map((data) => data);
  let sizeOfUser = mappedUsers.length;

  console.log(" size: " + sizeOfUser);

  const handleUnfollow = (user) => {
    const configuration = {
      method: "post",
      url:  "http://localhost:5001/users/unfollow/" + currentUser.name,
      data: {
        user
        },             
       };


       axios(configuration)
       .then((result) =>
       {
         console.log("result");
       })
       .catch((error) => {
         error = new Error();
       });

      window.location.reload(false);

  }
  

  useEffect(() => {
    axios.get("http://localhost:5001/users").then((response) => {
      setUsers(response.data);
      console.log("size of set: " + setAddedUsers.length);

      // console.log(response.data)
    });

    axios
      .get(`http://localhost:5001/users/friendsid/${currentUser.name}`)
      .then((response) => {
        setAddedUsers(response.data);
        console.log("size: " + setAddedUsers.length);
        console.log(response.data);
        setLoading(false);
      });

    const configurationfollowers = {
      method: "get",
      url: "http://localhost:5001/users/followers/" + currentUser.name,
    };
    axios(configurationfollowers).then((response) => {
      // for(let i = 0; i < response.data.length; i++){
      //   // console.log("Setting follower: " + response.data[i].name)
      //   // det.push(response.data[i].name)
      //   console.log("Followers: " + response.data[i].name)
      // console.log(response.data[i])
      setFollowedUsers(response.data);
      setFollowerLoading(false);
      // }
    });
  }, []);

  if (sizeOfUser === 1) {
  }
  return (
    <>
      <div style={{ gap: "20px" }} >
        <Grid sx={{ flexGrow: 1 }} container spacing={2} >
          <Grid item xs={12}>
            <Grid container spacing={3} >
              <Grid key={1} item style={{width:"50%"}} >
                <div>
                  <Card  style={{ width:"100%", height: "450px", overflowY: "scroll"}} className="friendsList">
                    <h2>Following</h2>
                    {!followerLoading && users && addedUsers ? (
                      addedUsers.map((added, x) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <Button sx={{margin:"-30px"}} onClick={(e) => handleUnfollow(added)} >X</Button>
                            <Avatar
                              sx={{
                                marginTop: "15px",
                                width: "60px",
                                height: "60px",
                                bgcolor:
                                  "#" +
                                  Math.floor(Math.random() * 16777215).toString(
                                    16
                                  ),
                                fontSize: "36px",
                                fontFamily: "Poppins",
                                fontWeight: 800,
                              }}
                            >
                              {added[0]}
                            </Avatar>
                            <NavLink style={{textDecoration: "None"}} to={"/profile/"+added}><p style={{ fontSize: "20px", marginRight:"15px", color: "white"}}>@{added}</p></NavLink>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <CircularProgress />
                      </div>
                    )}
                  </Card>
                </div>
              </Grid>
              <Grid key={2} item style={{width:"50%"}}>
                <Card
                  style={{
                    width: "100%",
                    height: "450px",
                    overflowY: "scroll",
                  }}className="friendsList"
                >
                  <h2>Followers</h2>
                  {!followerLoading && followedUsers ? (
                    followedUsers.map((followed) => (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <Avatar
                              sx={{
                                marginTop: "15px",
                                width: "60px",
                                height: "60px",
                                bgcolor:
                                  "#" +
                                  Math.floor(Math.random() * 16777215).toString(
                                    16
                                  ),
                                fontSize: "36px",
                                fontFamily: "Poppins",
                                fontWeight: 800,
                              }}
                            >
                              {followed.name[0]}
                            </Avatar>
                            <NavLink style={{textDecoration: "None"}} to={"/profile/"+followed.name}><p style={{ fontSize: "20px", margin: 0, color: "white" }}>@{followed.name}</p></NavLink>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </div>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <h2>Other Users</h2>
        {!loading && users && addedUsers ? (
          users
            .filter(
              (user) =>
                user.name !== currentUser.name &&
                !addedUsers.includes(user.name)
            )
            .map((user, x) => (
              <FriendBox
                key={x}
                user={user}
                added={mappedUsers[sizeOfUser]}
                socket={socket}
              />
            ))
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
      </div>
      <div style={{ marginLeft: "5px" }}></div>
    </>
  );
};
export default FriendsPage;

export const Tester = ({ socket }) => {
  callSocket(socket);
  return <></>;
};
