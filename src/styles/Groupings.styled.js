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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
 /* 
  grid-template-columns: repeat(3, minmax(1fr, 300px));
 */
`;
const Group = styled.div`
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 600px;
`;

export { Header, Content, Group };
