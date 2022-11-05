import {Box, Modal, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import React, { useState, useEffect } from "react";
import ButtonComponent from "../LoginComponent/ButtonComponent";
import styled from "styled-components";
import "./ReviewForm.css";
import RatingSelection from "./RatingSelection";
import MoviePic from "./MoviePic.png";
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import CreateIcon from '@mui/icons-material/Create';
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
  };

  let socket;
  let users;
function callSocket(sockets){
  socket = sockets;
}

export default function ReviewForm({title, image, id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useSelector(selectUser);
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState("");
    const [score, setScore] = useState(0);
    const [movie, setMovie] = useState(id);
    const [spoiler,setSpoiler] = useState(false);
    const [followers, setFollowers] = useState(null)
    const [addedUsers, setAddedUsers] = useState([])
    let size;
    let type = 1;
    // useEffect(()=> {
      
  // },[])
    const handleSubmit = (e) => {
      setName(user.name);
      setMovie(id);
      console.log(name);
      console.log(id);
      // prevent the form from refreshing the whole page
      e.preventDefault();
      console.log(name, description, score, movie, spoiler, image);

   
      const configurationfollowers = {
        method: "get",
        url: "http://localhost:5001/users/followers/"+user.name,       
      };

      const configuration = {
        method: "post",
        url: "http://localhost:5001/reviews/add",
        data: {
          name,
          description,
          score,
          movie,
          spoiler,
          image
        },
      };
      // make a popup alert showing the "submitted" text
      axios(configurationfollowers)
      .then((response) => {
        console.log("Reviews2: " + response.data.length)
        for(let i = 0; i < response.data.length; i++){
          // console.log("Setting follower: " + response.data[i].name)
          // det.push(response.data[i].name)
          console.log("Sending to " + response.data[i].name)
          socket.emit("sendNotification", {
            senderName: name,
            receiverName: response.data[i].name,
            type: 2,
          })
        }
        // for(let i = 0; i < det.length; i++){
          // console.log("Sending to " + det[i])
        // socket.emit("sendNotification", {
        //   senderName: name,
        //   receiverName: det[i], 
        // })
      // }
        }
      )
        
      axios(configuration)
  
        .then((result) => 
        {
          console.log(result);
          console.log(`${name} and ${movie}`);
  
        })
        .catch((error) => {
          error = new Error();
        });
     
        handleClose()
    
  };
 
    return (
        <div>
        <Button onClick={handleOpen}>
          <div className="circle"><CreateIcon sx={{ fontSize: 55 ,paddingTop:1}}/></div>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="ReviewTop">
                <img style={{height:"20vh",borderRadius:"5px"}} src={image ? "https://image.tmdb.org/t/p/w500"+image : MoviePic} alt="" />
                <h2 style = {{marginLeft: "10px"}}>{title ? title : "Avengers: Endgame"}</h2>
            </div>
            <h2>Write Your Review</h2>
            <div className="RatingSection" id="modal-modal-title">
                Rating: <RatingSelection rating = {score} onratingchange = {setScore} /> 
            </div>
            <p id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField style={{backgroundColor: "#06021C", color: "white"}} onChange={(e) => setDescription(e.target.value)}></TextField>
            </p>
            <FormGroup>
                <div className="SpoilerArea">
                    <FormControlLabel control={<Checkbox sx={{color:"white"}} onChange={(e) => setSpoiler(!spoiler)}/>} label={<p style={{margin:0, fontWeight: "bold", fontSize: "20px", color: "white"}}>Spoiler</p>}/>
                </div>
            </FormGroup>
            <br/>
            <ButtonComponent onClick={(e) => handleSubmit(e)} style={{height: "30px", width: "100px", borderRadius: "25px 25px", fontSize: "15px", float: "right"} } >Submit</ButtonComponent>
          </Box>
        </Modal>
      </div>
    );
    }

  export const ReviewNotify=({socket})=> {
    callSocket(socket);
    return (<></>)
  }