import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import ButtonComponent from "./ButtonComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFunc } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

export const InputField = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 1em;
  font-family: "Poppins";
  box-sizing: border-box;
  transition: box-shadow 500ms ease, transform 500ms ease;

  &:focus {
    box-shadow: 5px 5px 0px 2px #4930ff;
    transform: translateY(5px);
  }

  &::before {
    content: "test";
    width: 5px;
    height: 5px;
    background: red;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25vw",
  height: "fit-content",
  color: "white",
  borderRadius: "15px",
  bgcolor: "#0B0725",
  boxSizing: "border-box",
  boxShadow: 15,
  p: 8,

  "@media (max-width: 640px)": {
    width: "90%",
    p: 5
  }
};

export default function SignUpComponent() {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  let navigate = useNavigate(); 

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    dispatch(loginFunc({
      name: name,
      email: email,
      password:password,
      loggedIn: true
    }));

    const configuration = {
      method: "post",
      url: "http://localhost:5001/users/register",
      data: {
        name,
        email,
        password,
      },
    };
    // make a popup alert showing the "submitted" text
    axios(configuration)
      .then((result) => {
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
    alert("Submited");
    let path = "/home/"; 
    navigate(path);
    
  }
  return (
    <div>
      <ButtonComponent onClick={handleOpen}> Sign Up </ButtonComponent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx = {{
          ".MuiBackdrop-root": {
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Poppins",
            }}
          >
            Sign Up
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Username
          </Typography>
          <InputField value={name} onChange={(e) => setName(e.target.value)}/>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Email
          </Typography>
          <InputField value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Password
          </Typography>
          <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <br/><br></br>
          <ButtonComponent onClick={(e)=>handleSubmit(e)}> Sign Up </ButtonComponent>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Already a user? Login!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
