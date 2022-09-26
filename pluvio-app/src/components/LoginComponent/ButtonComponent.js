import styled from "styled-components";

const ButtonComponent = styled.button`
    background-color: #4930ff;
    color: white;
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 25px 0px;
    transition: background-color 500ms ease, border-radius 750ms ease;
    font-family: "Poppins";
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;

  &:hover {
    background: #25159d;
    border-radius: 0px 25px;
  }
`;

export default ButtonComponent; 