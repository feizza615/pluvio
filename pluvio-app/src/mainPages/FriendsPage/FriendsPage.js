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
  const currentUser = useSelector(selectUser);

  const handleClick = (e, friend) => {
    e.preventDefault();

    const name = currentUser.name;

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

  const currentUser = useSelector(selectUser);

  useEffect(() => {
    axios.get("http://localhost:5001/users").then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });

    axios
      .get(`http://localhost:5001/users/friendsid/${currentUser.name}`)
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
