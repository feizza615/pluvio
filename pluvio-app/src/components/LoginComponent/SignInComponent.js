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
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(400px, 90%)",
  height: "fit-content",
  color: "white",
  borderRadius: "15px",
  bgcolor: "#0B0725",
  boxSizing: "border-box",
  boxShadow: 15,
  p: 5,

  "@media (max-width: 640px)": {},
};

export default function LoginComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate(); 

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // dispatch(login({
    //   email: email,
    //   password:password,
    //   loggedIn: login
    // }))
    const configuration = {
      method: "post",
      url: "http://localhost:5001/users/login",
      data: {
        name,
        password,
      },
    };
    // make a popup alert showing the "submitted" text
    axios(configuration)

      .then((result) => 
      {
        console.log(result);
        console.log("SUCCESS");

        dispatch(loginFunc({
          name: name,
          loggedIn: true,
          color: result.data.color,
        }));

        let path = "/home/"; 
        navigate(path);

      })
      .catch((error) => {
        error = new Error();
        setError(true)
      });
  };

  return (
    <div>
      <ButtonComponent onClick={handleOpen} style={{marginRight: "20px"}}> Sign In </ButtonComponent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ".MuiBackdrop-root": {
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={style}>
          {error ? <p style={{color: "orange", margin: 0}}>Error signing in, password or username is incorrect.</p> : null}
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
            Sign In
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Username
          </Typography>
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Password
          </Typography>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br></br>
          <ButtonComponent onClick={(e) => handleSubmit(e)}>
            {" "}
            Sign In{" "}
          </ButtonComponent>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Need an account? Sign Up!
            <br/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
