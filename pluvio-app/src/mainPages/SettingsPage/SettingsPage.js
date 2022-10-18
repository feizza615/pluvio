import React, { Component, useState } from 'react'
import Card from '../../components/Card';
import styled from "styled-components";
import "./SettingsPage.css"
import ButtonComponent from '../../components/LoginComponent/ButtonComponent';
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser, loginFunc } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const InputField = styled.input`
  width: 100%;
  height: 35px;
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

export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //UserName
  const [oldName, setOldName] = useState("");
  const [newName, setName] = useState("");


  //Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setPassword] = useState("");


  //Email
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setEmail] = useState("");


  const [errorPopup, setError] = useState(false);
  const [errorPopup2, setError2] = useState(false);
  const [details2, setDetails2] = useState(null)

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);


  const handleSubmit = (e, type) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    if (type === "name") {
      let verified = verifyData(type);
      if (oldName === verified) {
        setError(false)

        handleOpen(true)

      }
      else {
        setError(true)
        handleOpen(true)
      }
    }

    if (type === "email") {
      let verified = verifyData(type);
      if (oldEmail === verified) {
        console.log("test1")
        setError2(false)
        handleOpen2(true)
      }
      else {
        setError2(true)
        handleOpen2(true)
      }
    }
  }


  function verifyData(type) {
    const configuration = {
      method: "get",
      url: "http://localhost:5001/users/verify/" + user.name,
    };
    axios(configuration)
      .then((response) => {
        setDetails2(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        error = new Error();
      });

    switch (type) {
      case "name":
        return details2[0].name;
      case "password":
        return details2[0].password;
      case "email":
        return details2[0].email;
    }
  }



  function onChangeRefresh() {
    dispatch(loginFunc(null))
  }

  function onChangeLogin(type) {

    if (type === "user") {
      dispatch(loginFunc({
        name: newName,
        loggedIn: true,
      }));
    }

    else if (type === "email") {
      dispatch(loginFunc({
        name: user.name,
        loggedIn: true,
      }));
    }

  }




  /* 
  ---------------------------User handling---------------------------
  */
  function runUser() {
    console.log("Matched name")
    handleName();

    onChangeRefresh();
    setTimeout(() => {
      onChangeLogin("user");
    }, 200)
  }

  function handleName() {
    const configurationName = {
      method: "post",
      url: "http://localhost:5001/users/modify/name",
      data: {
        newName,
        oldName,
      },
    };
    axios(configurationName)
      .then((result) => {
        console.log(result);
        console.log(user)
      })
      .catch((error) => {
        error = new Error();
      });
  }
  /* 
  ---------------------------User handling---------------------------
  */

  /* 
  ---------------------------Email handling---------------------------
  */
  function runEmail() {
    console.log("Matched name")
    handleEmail();

    onChangeRefresh();
    setTimeout(() => {
      onChangeLogin("email");
    }, 200)
  }

  function handleEmail() {
    const configurationEmail = {
      method: "post",
      url: "http://localhost:5001/users/modify/email",
      data: {
        oldEmail,
        newEmail,
      },
    };
    axios(configurationEmail)
      .then((result) => {
        console.log(result);
        console.log(user)
      })
      .catch((error) => {
        error = new Error();
      });
  }


  /* 
  ---------------------------Email handling---------------------------
  */

  return (
    <>
      <div>
        <p>Settings</p>
        <br />
        <Card>Profile Box</Card>
        <br />
        <div className='changeUser'>
          <Card>Change Email
            <br /><br />
            <InputField onChange={(e) => setOldEmail(e.target.value)} placeholder='Old Email'></InputField>
            <br />
            <br />
            <InputField onChange={(e) => setEmail(e.target.value)} placeholder='New Email' />
            <br /><br />
            <div style={{ float: "right" }}>
              <ButtonComponent onClick={(e) => handleSubmit(e, "email")} style={{ width: "115px", height: "40px", fontSize: "17px" }}>Confirm</ButtonComponent>
              <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  ".MuiBackdrop-root": {
                    backdropFilter: "blur(10px)",
                  },
                }}
              >
                <Box sx={style}>
                  {errorPopup2 ? <p style={{ color: "orange", margin: 0 }}>Email does not match</p> : <><Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Do you really want to change your email?
                  </Typography><br></br>
                    {/* onClick={(e) => handleSubmit(e, "name")} */}
                    <ButtonComponent onClick={runEmail} style={{ float: "left", width: "115px", height: "40px", fontSize: "17px" }}>Yes</ButtonComponent>
                    <ButtonComponent onClick={handleClose2} style={{ float: "right", width: "115px", height: "40px", fontSize: "17px" }}>No</ButtonComponent>
                  </>}

                </Box>
              </Modal>
            </div>
          </Card>
          <Card>Change User
            <br /><br />
            <InputField onChange={(e) => setOldName(e.target.value)} placeholder='Old User' />
            <br /><br />
            <InputField value={newName} onChange={(e) => setName(e.target.value)} placeholder='New User' />
            <br /><br />
            <div style={{ float: "right" }}>
              <ButtonComponent onClick={(e) => handleSubmit(e, "name")} style={{ width: "115px", height: "40px", fontSize: "17px" }}>Confirm</ButtonComponent>
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
                  {errorPopup ? <p style={{ color: "orange", margin: 0 }}>User does not match</p> : <><Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Do you really want to change your user?
                  </Typography><br></br>
                    {/* onClick={(e) => handleSubmit(e, "name")} */}
                    <ButtonComponent onClick={runUser} style={{ float: "left", width: "115px", height: "40px", fontSize: "17px" }}>Yes</ButtonComponent>
                    <ButtonComponent onClick={handleClose} style={{ float: "right", width: "115px", height: "40px", fontSize: "17px" }}>No</ButtonComponent>
                  </>}

                </Box>
              </Modal>


            </div>
          </Card>
        </div>
        <br />
        <Card>Change Password
          <br /><br />
          <InputField placeholder='Old Password'></InputField>
          <br /><br />
          <InputField placeholder='New Password' onChange={(e) => setPassword(e.target.value)} ></InputField>
          <br /><br />
          <div style={{ float: "right" }}>
            <ButtonComponent style={{ width: "115px", height: "40px", fontSize: "17px" }}>Confirm</ButtonComponent>
            <br /><br />
          </div>
        </Card>
      </div>
    </>
  )

}