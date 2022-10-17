import React, { Component } from 'react'
import Card from '../../components/Card';
import styled from "styled-components";
import "./SettingsPage.css"
import ButtonComponent from '../../components/LoginComponent/ButtonComponent';

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



export default class SettingsPage extends Component {
  render() {
    return (
        <>
    <div>
      <p>Settings</p>
      <br/>
      <Card>Profile Box</Card>
      <br/>
        <div className='changeUser'>
      <Card>Change Email 
        <br/><br/>
        <InputField placeholder='Old Email'></InputField>
        <br/>
        <br/>
        <InputField placeholder='New Email'></InputField>
        <br/><br/>
        <div style={{float: "right"}}>
        <ButtonComponent style = {{width: "115px" , height: "40px", fontSize: "17px"}}>Confirm</ButtonComponent>
        </div>
      </Card>
      <Card>Change User 
        <br/><br/>
        <InputField placeholder='Old User'></InputField>
        <br/><br/>
        <InputField placeholder='New User'></InputField>
        <br/><br/>
        <div style={{float: "right"}}>
        <ButtonComponent style = {{width: "115px" , height: "40px", fontSize: "17px"}}>Confirm</ButtonComponent>
        </div>
      </Card>
        </div>
        <br/>
        <div className='passwordBottomArea'>
        <Card style={{height: "250px"}}>Change Password
        <br/><br/>
        <InputField placeholder='Old Password'></InputField>
        <br/><br/>
        <InputField placeholder='New Password'></InputField>
        <br/><br/>
        <div style={{float: "right"}}>
        <ButtonComponent style = {{width: "115px" , height: "40px", fontSize: "17px"}}>Confirm</ButtonComponent>
        <br/><br/>
        </div>
        </Card>
        <Card style={{height: "250px"}}><p style = {{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>Options</p>

        </Card>
        </div>
    </div>
      </>
    )
  }
}