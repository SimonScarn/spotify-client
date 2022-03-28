import styled from "styled-components";

const Header = styled.div`
  display: grid;
  place-content: center;

  h1 {
    font-style: italic;
  }
`;

const Content = styled.div`
  border: 1px solid blue;
  disply: grid;
  padding: 20px;

`;
const Group = styled.div`
  border: 1px solid red;
`;

export { Header, Content, Group };
