import React, { useEffect, useState } from "react";
import Picture from "./ProfilePic.png";
import "./ProfileBox.css";
import Card from "../Card.js";
import balls from "../IntroBoxComponent/balls.png";
import { Avatar, Box, Button, Modal } from "@mui/material";
import axios from "axios";
import Tag from "../TagComponent/Tag";
import styled from "styled-components";
import ButtonComponent from "../LoginComponent/ButtonComponent";
import { ChromePicker } from "react-color";
import { useSelector } from "react-redux";
import {
  selectUser,
  loginFunc,
  logout,
  changeColor,
} from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import { red } from "@mui/material/colors";

export const TextField = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 20px;
  font-family: "Poppins";
  box-sizing: border-box;
  transition: box-shadow 500ms ease, transform 500ms ease;
  resize: none;
  background: #06021c;
  color: white;

  &:focus {
    box-shadow: 5px 5px 0px 2px #4930ff;
    transform: translateY(5px);
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(600px, 90%)",
  bgcolor: "#0B0725",
  border: "2px solid #000",
  boxSizing: "border-box",
  boxShadow: 15,
  p: 5,
  borderRadius: 10,
};

export default function ProfilePageBox({ userdata }) {
  const [about, setAbout] = useState("");
  const [open, setOpen] = React.useState(false);
  const [picker, setPicker] = useState(false);
  const [color, setColor] = useState(userdata.color);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const bg = {
    color: color,
  };

  const handleChange = (color) => {
    setColor(color.hex);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPicker(!picker);
  };

  const name = userdata.username;
  console.log(name)
  

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    handleAbout();
    // dispatch(loginFunc(null))
    handleColor();
    setTimeout(() => {
      dispatch(
        loginFunc({
          name: user.name,
          color: color,
          loggedIn: true,
        })
      );
    }, 200);
    handleClose();
    console.log(user);
  };

  function handleAbout() {
    const configurationAbout = {
      method: "post",
      url: "http://localhost:5001/users/about",
      data: {
        name,
        about,
      },
    };
    axios(configurationAbout).then((result) => {
      console.log(result);
      console.log(about);
    });
  }

  function handleColor() {
    const configurationColor = {
      method: "post",
      url: "http://localhost:5001/users/color",
      data: {
        name,
        color,
      },
    };
    axios(configurationColor).then((result) => {
      console.log(result);
      console.log(color);
      console.log(user);
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/aboutid/${userdata.username}`)
      .then((response) => {
        console.log(response);
        //setLoading(false)
        setAbout(response.data);
      });
   
      axios
      .get(`http://localhost:5001/users/color/${userdata.username}`)
      .then((response) => {
        setColor(response.data);
      });
  }, []);

  var random = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <>
      <Card style={{ width: "auto", position: "relative" }}>
        <div className="top">
          {/* <img src={Picture} alt="profile" style={{background:"blue",borderRadius:"50%",padding: "0px 10px"}}/> */}
          <Avatar
            sx={{
              width: "75px",
              height: "75px",
              bgcolor: color,
              fontSize: "36px",
              fontFamily: "Poppins",
              fontWeight: 800,
            }}
          >
            {userdata ? userdata.username[0] : ""}
          </Avatar>
          <div className="texts">
            <p style={{ fontSize: "18px" }}>
              @{userdata ? userdata.username : "username"}
            </p>
            {user.name == userdata.username?
              <Button
              sx={{
                color: "gray",
                fontSize: "12px",
                textAlign: "left",
                p: 0,
                m: 0,
                textTransform: "none",
              }}
              onClick={handleOpen}
            >
              Edit Profile
            </Button>:null}
            {user.name != userdata.username?
              <ButtonComponent
              style={{
                width: 100,
                height: 25,
                fontSize: 10,
                borderRadius: 20,
              }}
              //onClick={handleOpen}
            >
              Follow
            </ButtonComponent>:null}
            
          </div>
          <div className="bottom">
            <div>
              <p>Following</p> <p>{userdata ? userdata.following : "0"}</p>
            </div>
            <div>
              <p>Follower</p> <p>{userdata ? userdata.followers : "0"}</p>
            </div>
            <div>
              <p>Review</p> <p>{userdata ? userdata.reviews : "0"}</p>
            </div>
          </div>
        </div>
        {/* <Tag text="About Me" /> */}
        <p>
          {" "}
          {/*Connect this w/user in database so it can be pulled in settings profilepage too*/}
          {about}
        </p>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="top">
            <div style={{ display: "grid", gap: "10px" }}>
              <Avatar
                sx={{
                  width: "75px",
                  height: "75px",
                  bgcolor: bg.color,
                  fontSize: "36px",
                  fontFamily: "Poppins",
                  fontWeight: 800,
                }}
              >
                {userdata ? userdata.username[0] : ""}
              </Avatar>
              <Button
                sx={{
                  backgroundColor: "#4930FF",
                  fontSize: "15px",
                  p: 0,
                  m: 0,
                  textTransform: "none",
                  color: "white",
                  width: "75px",
                  height: "fit-content",
                  fontFamily: "Poppins",
                }}
                onClick={handleClick}
              >
                Change
              </Button>
            </div>
            <div className="texts">
              <p style={{ fontSize: "25px" }}>
                @{userdata ? userdata.username : "username"}
              </p>
              <p>
                {" "}
                {/*Connect this w/user in database so it can be pulled in settings profilepage too*/}
                {about}
              </p>
            </div>
          </div>
          <div style={{ position: "absolute" }}>
            {picker ? (
              <ChromePicker color={color} onChange={handleChange} />
            ) : null}
          </div>
          <TextField
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Edit About Me"
          >
            {about}
          </TextField>
          <br />
          <br />
          <div style={{ float: "right" }}>
            <ButtonComponent
              onClick={handleSubmit}
              style={{ width: "115px", height: "40px", fontSize: "17px" }}
            >
              Confirm
            </ButtonComponent>
          </div>
        </Box>
      </Modal>
    </>
  );
}
