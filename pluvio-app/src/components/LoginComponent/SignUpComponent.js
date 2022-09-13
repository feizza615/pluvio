import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

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
};

export default function SignUpComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={[
          {
            backgroundColor: "#4930FF",
            color: "white",
            width: "150px",
            height: "50px",
            border: "none",
            borderRadius: "25px 0px",
            transition: "background-color 500ms ease, border-radius 500ms ease",
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "bold",
            textTransform: "uppercase",
            margin: "10px"
          },
          {
            "&:hover": {
              backgroundColor: "#25159D",
              borderRadius: "0px 25px",
            },
          },
        ]}
        onClick={handleOpen}
      >
        Sign Up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          <InputField />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Email
          </Typography>
          <InputField />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, fontFamily: "Poppins" }}
          >
            Password
          </Typography>
          <InputField type="password" />

          <button></button>
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
