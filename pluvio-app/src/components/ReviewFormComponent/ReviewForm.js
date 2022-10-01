import Picture from "./ReviewButtonPic.png"
import {Box, Modal, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import React, { useState } from "react";
import ButtonComponent from "../LoginComponent/ButtonComponent";
import styled from "styled-components";
import "./ReviewForm.css";
import RatingSelection from "./RatingSelection";
import MoviePic from "./MoviePic.png";
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

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


export default function ReviewForm({title, image, id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [score, setScore] = useState(0);
    const [movie, setMovie] = useState("");
    const [spoiler,setSpoiler] = useState(true);
    const user = useSelector(selectUser);

    const handleSubmit = (e) => {
      setName(user.name);
      setMovie(id);
      // prevent the form from refreshing the whole page
      e.preventDefault();
      console.log(name, description, score, movie, spoiler, image);

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
      axios(configuration)
  
        .then((result) => 
        {
          console.log(result);
          console.log(`${name} and ${movie}`);
  
        })
        .catch((error) => {
          error = new Error();
        });
  
    
  };
 
    return (
        <div style={{float:"right"}}>
        <Button onClick={handleOpen}>
          <img style={{position: "absolute"}} src={Picture} alt="profile" /><div className="circle"></div>

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
                    <FormControlLabel control={<Checkbox defaultChecked  onChange={(e) => setSpoiler(!spoiler)}/>} label={<p style={{fontWeight: "bold", fontSize: "20px", color: "white"}}>Spoiler</p>}/>
                </div>
            </FormGroup>
            <br/>
            <ButtonComponent onClick={(e) => handleSubmit(e)} style={{height: "30px", width: "100px", borderRadius: "25px 25px", fontSize: "15px", float: "right"} } >Submit</ButtonComponent>
          </Box>
        </Modal>
      </div>
    );
    }