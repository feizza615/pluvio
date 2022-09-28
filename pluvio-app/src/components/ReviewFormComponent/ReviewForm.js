import Picture from "./ReviewButtonPic.png"
import {Box, Modal, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import React, { useState } from "react";
import ButtonComponent from "../LoginComponent/ButtonComponent";
import styled from "styled-components";
import "./ReviewForm.css";
import RatingSelection from "./RatingSelection";
import MoviePic from "./MoviePic.png";



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
    width: "fit-content",
    bgcolor: "#0B0725",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };


export default function ReviewForm({titledata}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
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
                <img src={MoviePic} alt="" />
                <h1 style = {{textAlign: "center"}}>{titledata ? titledata.username : "Avengers: Endgame"}</h1>
            </div>
            <h2>Write Your Review</h2>
            <div className="RatingSection" id="modal-modal-title">
                Rating: <RatingSelection/> 
            </div>
            <p id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField style={{backgroundColor: "#06021C", color: "white"}}></TextField>
            </p>
            <FormGroup>
                <div className="SpoilerArea">
                    <FormControlLabel control={<Checkbox defaultChecked />} label=<p style={{fontWeight: "bold", fontSize: "20px", color: "white"}}>Spoiler</p>/>
                </div>
            </FormGroup>
            <br/>
            <ButtonComponent style={{height: "30px", width: "100px", borderRadius: "25px 25px", fontSize: "15px", float: "right"}}>Submit</ButtonComponent>
          </Box>
        </Modal>
      </div>
    );
  }
