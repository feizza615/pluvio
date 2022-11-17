import ButtonComponent from "../LoginComponent/ButtonComponent";
import styled from "styled-components";
import balls from "./balls.png";
import Card from "../Card";
import { NavLink } from "react-router-dom";

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-family: "Poppins";
  font-weight: bolder;
  font-size: 28px;
`;

// test 

const IntroBox = () => {
  return (
    <>
      <Card style={{position: "relative"}}>
        <Title>Find your perfect movie</Title>
        <p style={{fontWeight: 900}}>
          We’re constantly updating your recommendations based on your responses
          and watchlist. Look for what you’re most interested in and we can find
          the best movie for you!
        </p>
        <NavLink style={{textDecoration: "None"}} to="/match"><ButtonComponent>Match Me</ButtonComponent></NavLink>
        <img src={balls} alt="" 
        style={{position: "absolute", bottom: "-50px", right: "5%"}}
/>
      </Card>
    </>
  );
};

export default IntroBox;
