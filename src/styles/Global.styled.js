import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

const LoaderContainer = styled.div`
  display: grid;
  place-content: center;
  min-height: ${(props) => (props.full ? "100vh" : "75vh")};
  background: ${(props) => props.full && "#121212"};
  transition: background 0.3s ease-in-out;
`;

const LoadingRow = styled.div`
  grid-column: 1/-1;
  display: grid;
  place-content: center;
  height: 60px;
`;

const Wrapper = styled.div`
  position: relative;
  flex: 0.8;
  width: 100%;
  max-width: 80vw;
  padding-bottom: 100px;
  overflow-x: hidden;
  color: #fff;
  background-color: ${(props) => props.theme.colors.bgMain};
`;

const Section = styled.div`
  padding: 10px;
`;

const Row = styled.div`
  display: grid; 
  justify-content: left;
  gap: 10px;
  grid-auto-flow: column;
  grid-row: 1;
  grid-template-rows: ${(props) => props.double && "1fr 1fr"};
  position: relative;
  height: 250px;
  padding-bottom: 30px;
  padding-right: 10px;

  > div {
    display: grid !important;
    grid-auto-flow: column;
  grid-row: 1;
    gap: 10px;
    grid-template-rows: ${(props) => props.double && "1fr 1fr"};
  }


 /*  &::before {
    content: '';
  position: fixed;
  z-index: 100;

  right: 30px;
  width: 60px;
  height: 60px;
  background: pink;
    border-radius: 50px;
  } */
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
 /*  place-content: center; 
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 20px;
  padding: 20px;  */
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 60px;
  padding-left: 20px;
  margin-top: ${props => props.translate && '60px'};
  border-top: ${props => props.translate && '1px solid whitesmoke'};
`;

const ImageThumbnail = styled.div`
  height: 20px;
  width: 20px;

  img {
    height: 100%;
    object-fit: contain;
  }
`

const ArtistsContainer = styled.div`
  max-height: 30px;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PlayerContainer = styled.div`
  display: flex;
  height: 100vh;
  min-height: 100%;
`;

const AppContainer = styled.div`
  box-sizing: border-box;
  padding: 0px;
  margin: 0;
  overflow-x: hidden;
`;

const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5%;
`;

const ColorLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-right: 12px;

  &:hover {
    text-decoration: underline;
  }

  &:nth-of-type(1n) {
    color: ${(props) => props.theme.colors.colorPrimary};
  }

  &:nth-of-type(2n) {
    color: ${(props) => props.theme.colors.colorSecondary};
  }
`;

const PlayBtn = styled(IconButton)`
  && {
    visibility: hidden;
    gap: 15px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: ${(props) => (props.row ? "calc(50%-20px)" : "calc(65% - 15px)")};
    left: ${(props) => (props.row ? "87%" : "calc(80% - 15px)")};
    color: whitesmoke;
    background-color: ${(props) => props.theme.colors.colorSecondary};
    opacity: 0.1;
    cursor: default;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.2);
      background-color: ${(props) => props.theme.colors.colorSecondary};
    }
  }
`;

const AddLibraryBtn = styled(IconButton)`
  && {
    visibility: hidden;
    gap: 15px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    color: #000;
    background-color: whitesmoke;
    opacity: 1;
    cursor: default;
    transition: all 0.3s ease-in-out;

    &:hover {
      outline: 8px solid #000;
      outline-offset: -8px;
      background: whitesmoke;
    }
  }
`;


const FollowBtn = styled(Button)`
  && {
    height: 25px;
    width: 100px;
    border: 1px solid whitesmoke;
    color: whitesmoke;
  }
`;

const PlaylistShowBtn = styled(IconButton)`
  && {
    visibility: hidden;
    color: whitesmoke;
  }
`;

const FavoriteBtn = styled(IconButton)`
  && {
    visibility: ${(props) => props.favorite === false && "hidden"};
    color: ${(props) => props.theme.colors.colorSecondary};
  }
`;

export {
  LoaderContainer,
  LoadingRow,
  Wrapper,
  Section,
  Row,
  Grid,
  Toolbar,
  ImageThumbnail,
  ArtistsContainer,
  PlayerContainer,
  AppContainer,
  HeaderTitle,
  ColorLink,
  PlayBtn,
  AddLibraryBtn,
  FollowBtn,
  PlaylistShowBtn,
  FavoriteBtn,
};
