import React, { Component, useState, useEffect } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import "./ReactionButtons.css";
import {
  Box,
  Modal,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
const style = {
  fontSize: "15px",
  float: "left",
  marginTop: "10px",
  marginLeft: "10px",
};

const ReactionButtons = (props) => {
  return (
    <div id="buttonContainer">
        <Button>
          <div className="circle">
            <ThumbUpOffAltIcon classname="icon" sx={{ fontSize: 55 ,paddingTop:1}}/>
          </div>
        </Button>
        <Button>
          <div className="circle">
            <ThumbDownOffAltIcon classname="icon" sx={{ fontSize: 55 ,paddingTop:1}}/>
          </div>
        </Button>
    </div>
  );
};

export default ReactionButtons;
