import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 60%;
  height: 50%;
  padding: 30px;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(15deg, #000000 0%, #202020 74%);
  border-radius: 5px;
  p {
    color: white;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-areas:
    "img title controls"
    "search search x";
  row-gap: 30px;

  img {
    grid-area: img;
  }
`;

const Controls = styled.div`
    display: grid;
    place-content: center;
`

const SearchedTracks = styled.div`
  overflow-y: auto;
`;

const Track = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.2fr 1fr 1.25fr auto;
  gap: 5px;
  position: relative;
  margin-bottom: 10px;
  padding: 0 10px 0 0;
  color: #fff; 

  /*     &:after {
        content: none;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height:  2px;
        background: whitesmoke;
        transition: all .3s ease-in-out;
    }

    &:hover&::after {
        content: '';
    } */

  img {
    height: 40px;
    width: 40px;
  }

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const InputTitle = styled.input`
  grid-area: title;
  height: 30px;
  margin-left: 16px;
  font-size: 18px;
  &:focus {
    outline: 3px solid black;
  }
`;

const InputSearch = styled.input`
  grid-area: search;
  height: 24px;
  font-size: 16px;

  &:focus {
    outline: 3px solid black;
  }
`;

export { Container, InputTitle, InputSearch, SearchedTracks, Track, Header, Controls };
