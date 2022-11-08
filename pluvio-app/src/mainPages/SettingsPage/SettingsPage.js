import React, { Component, createContext, useState } from "react";
import Card from "../../components/Card";
import styled from "styled-components";
import "./SettingsPage.css";
import ButtonComponent from "../../components/LoginComponent/ButtonComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser, loginFunc } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";
import ProfilePageBox from "../../components/ProfileBoxComponent/ProfilePageBox";


export const ThemeContext = createContext(null);

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
    transform: translateY(-5px);
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
  const [details2, setDetails2] = useState(null)
  const usersName = user.name;

  /* ------------- Light Mode ------------- */
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  /* ------------- Light Mode ------------- */

  /* ------------- User ------------- */
  const [oldName, setOldName] = useState("");
  const [newName, setName] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorPopup, setError] = useState(false);
  /* ------------- User ------------- */

  /* ------------- Password (WIP) ------------- */
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [hasedPw, setHashed] = useState(false)
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [errorPopup3, setError3] = useState(false);
  /* ------------- Password (WIP) ------------- */

  /* ------------- Email ------------- */
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setEmail] = useState("");

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [errorPopup2, setError2] = useState(false);
  /* ------------- Email ------------- */

  const handleSubmit = (e, type) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    if (type === "name") {
      let verified = verifyData(type);
      if (oldName === verified) {
        setError(false); //No error popup since old name matches
        handleOpen(true);
      } else {
        setError(true); //error popup since old name doesn't match
        handleOpen(true);
      }
    }

    if (type === "email") {
      let verified = verifyData(type);
      if (oldEmail === verified) {
        setError2(false); //No error popup since old email matches
        handleOpen2(true);
      } else {
        setError2(true); //error popup since old email doesn't match
        handleOpen2(true);
      }
    }

    if (type === "password") {
      if(oldPassword === ""){
        setError3(true)   //error popup since old email doesn't match
        handleOpen3(true)
      }
      else {
          const configurationPassword = {
            method: "get",
            url: "http://localhost:5001/users/passwordCheck/" + user.name + "/"+ oldPassword,
          };

          axios(configurationPassword)
            .then((result) => {            
              if(result.data === true){
                console.log(result)
                setError3(false)   //No error popup since old email matches
                handleOpen3(true)
              } else {
                console.log(result.data)
                setError3(true)   //error popup since old email doesn't match
                handleOpen3(true)
              }
            })
            .catch((error) => {
              error = new Error();
            });
      }
    }
  }


  /* Verify the user; return proper data */
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

  /*-------- Refresh Profile --------*/
  function onChangeRefresh() {
    dispatch(loginFunc(null));
  }

  function onChangeLogin(type) {
    if (type === "user") {
      dispatch(
        loginFunc({
          name: newName,
          loggedIn: true,
        })
      );
    } else if (type === "email") {
      dispatch(
        loginFunc({
          name: user.name,
          loggedIn: true,
        })
      );
    }
  }
  /*-------- Refresh Profile --------*/

  /*---------------------------User handling---------------------------*/
  function runUser() {
    console.log("Matched name");
    handleName();

    onChangeRefresh();
    setTimeout(() => {
      onChangeLogin("user");
      window.location.reload(false);
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
      const configurationReviewName = {
        method: "post",
        url: "http://localhost:5001/reviews/modify/name",
        data: {
          newName,
          oldName,
        },
    };
    axios(configurationName)
      .then((result) => {
        console.log(result);
        console.log(user);
      })
      .catch((error) => {
        error = new Error();
      });
      
      axios(configurationReviewName)
      .then((result) => {
        console.log(result);
        console.log(user)
      })
      .catch((error) => {
        error = new Error();
      });
  }
  /*---------------------------User handling---------------------------*/

  /*---------------------------Email handling---------------------------*/
  function runEmail() {
    console.log("Matched name");
    handleEmail();

    onChangeRefresh();
    setTimeout(() => {
      onChangeLogin("email");
    }, 200);
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
        console.log(user);
      })
      .catch((error) => {
        error = new Error();
      });
  }
  /*---------------------------Email handling---------------------------*/

  
/*---------------------------Password handling---------------------------*/
  function runPassword() {
    console.log("Matched password")
    handlePassword();

    onChangeRefresh();
    setTimeout(() => {
      onChangeLogin("email");
    }, 200)
  }

  function handlePassword() {
    const configurationPassword = {
      method: "post",
      url: "http://localhost:5001/users/changePassword",
      data: {
        usersName,
        newPassword,
      },
    };
    axios(configurationPassword)
      .then((result) => {
        console.log(result);
        console.log(user)
      })
      .catch((error) => {
        error = new Error();
      });
  }

/*---------------------------Password handling---------------------------*/

  //for pulling about me
  const userdata = {
    username: user.name,
    following: 20,
    followers: 1,
    reviews: 21,
    color: user.color,
  };

  return (
    <>
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div >
        <p>Settings</p>
        <br />
        <ProfilePageBox userdata={userdata} />
        <br />

        <div className="changeUser">
          <Card id = {theme}>
            Change Email
            <br />
            <br />
            <InputField
              onChange={(e) => setOldEmail(e.target.value)}
              placeholder="Old Email"
            ></InputField>
            <br />
            <br />
            <InputField
              onChange={(e) => setEmail(e.target.value)}
              placeholder="New Email"
            />
            <br />
            <br />
            <div style={{ float: "right" }}>
              <ButtonComponent className="buttonswitch"
                onClick={(e) => handleSubmit(e, "email")}
                style={{ width: "115px", height: "40px", fontSize: "17px" }}
              >
                Confirm
              </ButtonComponent>
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
                  {errorPopup2 ? (
                    <p style={{ color: "orange", margin: 0 }}>
                      Email does not match
                    </p>
                  ) : (
                    <>
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
                        Do you really want to change your email?
                      </Typography>
                      <br></br>
                      {/* onClick={(e) => handleSubmit(e, "name")} */}
                      <ButtonComponent className="buttonswitch"
                        onClick={runEmail}
                        style={{
                          float: "left",
                          width: "115px",
                          height: "40px",
                          fontSize: "17px",
                        }}
                      >
                        Yes
                      </ButtonComponent>
                      <ButtonComponent
                        className="buttonswitch"
                        onClick={handleClose2}
                        style={{
                          float: "right",
                          width: "115px",
                          height: "40px",
                          fontSize: "17px",
                        }}
                      >
                        No
                      </ButtonComponent>
                    </>
                  )}
                </Box>
              </Modal>
            </div>
          </Card>
          <Card id = {theme}>
            Change User
            <br />
            <br />
            <InputField
              onChange={(e) => setOldName(e.target.value)}
              placeholder="Old User"
            />
            <br />
            <br />
            <InputField
              value={newName}
              onChange={(e) => setName(e.target.value)}
              placeholder="New User"
            />
            <br />
            <br />
            <div style={{ float: "right" }}>
              <ButtonComponent
                className="buttonswitch"
                onClick={(e) => handleSubmit(e, "name")}
                style={{ width: "115px", height: "40px", fontSize: "17px" }}
              >
                Confirm
              </ButtonComponent>
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
                  {errorPopup ? (
                    <p style={{ color: "orange", margin: 0 }}>
                      User does not match
                    </p>
                  ) : (
                    <>
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
                        Do you really want to change your user?
                      </Typography>
                      <br></br>
                      {/* onClick={(e) => handleSubmit(e, "name")} */}
                      <ButtonComponent
                        className="buttonswitch"
                        onClick={runUser}
                        style={{
                          float: "left",
                          width: "115px",
                          height: "40px",
                          fontSize: "17px",
                        }}
                      >
                        Yes
                      </ButtonComponent>
                      <ButtonComponent
                        className="buttonswitch"
                        onClick={handleClose}
                        style={{
                          float: "right",
                          width: "115px",
                          height: "40px",
                          fontSize: "17px",
                        }}
                      >
                        No
                      </ButtonComponent>
                    </>
                  )}
                </Box>
              </Modal>
            </div>
          </Card>
        </div>
        <br/>
        <div className='passwordBottomArea'>
        <Card id = {theme} style={{height: "fit-content"}}>Change Password
        <br/><br/>
        <InputField placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} ></InputField>
        <br/><br/>
        <InputField placeholder='New Password' onChange={(e) => setPassword(e.target.value)} ></InputField>
        <br/><br/>
        <div style={{float: "right"}}>
        <ButtonComponent className="buttonswitch" onClick={(e) => handleSubmit(e, "password")} style={{ width: "115px", height: "40px", fontSize: "17px" }}>Confirm</ButtonComponent>
        <br/><br/>
        <div style={{ float: "right" }}>
              
              <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  ".MuiBackdrop-root": {
                    backdropFilter: "blur(10px)",
                  },
                }}
              >
                <Box sx={style}>
                  {errorPopup3 ? <p style={{ color: "orange", margin: 0 }}>Password does not match</p> : <><Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Do you really want to change your password?
                  </Typography><br></br>
                    {/* onClick={(e) => handleSubmit(e, "name")} */}
                    <ButtonComponent className="buttonswitch" onClick={runPassword} style={{ float: "left", width: "115px", height: "40px", fontSize: "17px" }}>Yes</ButtonComponent>
                    <ButtonComponent className="buttonswitch" onClick={handleClose3} style={{ float: "right", width: "115px", height: "40px", fontSize: "17px" }}>No</ButtonComponent>
                  </>}

                </Box>
              </Modal>


            </div>

        </div>
        </Card>
          <Card id = {theme} style={{ height: "fit-content" }}>
            Options
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "20px" }}>Light Mode</p>
              <div style={{ marginTop: "-0.25em" }}>
                <Switch onChange={toggleTheme} checked={theme === "light"}/>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </ThemeContext.Provider>
    </>
  );
}
