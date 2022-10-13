import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Card from "../Card";
import ButtonComponent from "../LoginComponent/ButtonComponent";



export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-family: "Poppins";
  font-weight: bolder;
  text-align: center;
`;

export const Text = styled.h2`
  margin: 0;
  padding: 0;
  font-family: "Poppins";
  font-weight: bolder;
  text-align: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const ErrorBox = () => {
  return (
    <>
      <Card>
        <Box>
          <Title>404</Title>
          
          <Text>Page Not Found</Text>
        
          <NavLink to="/home">
          <ButtonComponent>Go Home</ButtonComponent></NavLink>
        </Box>
      </Card>
    </>
  );
};

export default ErrorBox;