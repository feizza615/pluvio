import styled from "styled-components";


export const Label = styled.div`
  background-color: #4930FF;
  width: fit-content;
  height: fit-content;
  text-align: center;
  box-align: center;
  color: #ffffff;
  padding: 15px;
  border-radius: 15px;
  font-family: "Poppins";
  font-weight: bold;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-family: "Poppins";
  font-weight: bolder;
`;

const Tag = ({text}) => {
  return (
    <>
      <Label>{text}</Label>
    </>
  );
};

export default Tag;