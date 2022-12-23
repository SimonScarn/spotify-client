import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0px;
  display: flex;
  width: 100%;
  padding: 5px 10px;
  height: 60px;
  background-color: red;


  & > * {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding-top: 5px;
    padding-right: 20px;
  }
`;

const Controls = styled.div`
display: flex;
gap: 280px;
  position: absolute;
  top: 30%;
  left: 50%;
  z-index: -10;
  transform: translate(-50%, 0%);
  color: black;
  font-size: 1.5em;
  font-weight: 900;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  border: 1px solid red;

`;

const CurrentTime = styled.span`
  top: 15px;
  left: 35%;
  font-size: 32px;
`;
const TotalTime = styled.span`
  top: 15px;
  left: 60%;
  font-size: 32px;
`;

export { Container, Controls, CurrentTime, TotalTime };
