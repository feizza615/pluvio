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



export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [oldName, setOldName] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [details2, setDetails2] = useState(null)

  let nameChange, emailChange, passwordChange;

  function onChangeRefresh(){
      dispatch(loginFunc(null))
  }

  function onChangeLogin(){
    dispatch(loginFunc({
      name: newName,
      loggedIn: true,
    }));
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


  function handleName(){
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

  function handleEmail(){
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

  const handleSubmit = (e, type) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
console.log(type);
    if (type === "name") {
    let verified = verifyData("name");
      if (oldName === verified) {
        console.log("Matched name")
        handleName();
        alert("User successfully changed")
        
        onChangeRefresh();
        setTimeout(() => {
          onChangeLogin();          
         }, 200)
      }
      else {
        alert("Not a matching name")
      }
    }

    if (type === "email") {
      let verified = verifyData("email");
        if (oldEmail === verified) {
          console.log("Matched Email")
          handleEmail();

          alert("Email successfully changed")
        
        onChangeRefresh();
        setTimeout(() => {
          onChangeLogin();          
         }, 200)
        }
        else {
          alert("Not a matching email");
        }
      }
  }


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