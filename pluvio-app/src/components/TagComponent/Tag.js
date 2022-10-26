import styled from "styled-components";


export const Label = styled.div`
  background-color: #4930FF;
  width: fit-content;
  height: fit-content;
  text-align: center;
  box-align: center;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 15px;
  font-family: "Poppins";
  font-weight: bold;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-family: "Poppins";
  font-weight: bolder;
  font-size: 16px;
`;

const Tag = ({text}) => {
  return (
    <>
      <Label>
        <Title>
          {text}
        </Title>
      </Label>
      
    </>
  );
};

export default Tag;