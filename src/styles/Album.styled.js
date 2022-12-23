import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 0.8;
  height: 100%;
  width: 100%;
  padding-bottom: 40px;
  overflow-y: auto;
  background-color: var(--bg-color);
  color: var(--info-color);
`;

const Image = styled.img`
  flex: 0.3;
  height: 90%;
  margin-right: 2rem;
  margin-top: 80px;
  margin-bottom: auto;
  object-fit: contain;
  border-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 40vh;
  padding: 20px 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-image: linear-gradient(rgb(197, 165, 66), rgb(225, 194, 92));
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    z-index: -1;
    background-color: var(--header-color);
    transition: 0.3s ease-in;
  }

  & > div {
    flex: 0.7;
    padding: 0;
    margin: 0;
  }
`;

const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 110px !important;
  color: #fff;
  

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & > p {
    margin: 0;
    padding: 0;
    font-size: 0.7rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  & > h3 {
    font-size: 1rem;
  }
`;

const TracksContainer = styled.div`
  padding: 20px;
  border-top: 1px solid whitesmoke;
`;

const ArtistLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 700;
  font-size: 19px;

  &:hover {
    color: ${(props) => props.theme.colors.colorSecondary};
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: .7px;
  font-style: oblique;
  color: black;
`;

const Label = styled.p`
  margin-left: 20px;
  font-style: italic;
`;

const PlayBtn = styled(IconButton)`
  && {
    color: white;
  }
`;

export {
  Container,
  Image,
  Header,
  AlbumDetails,
  TracksContainer,
  ArtistLink,
  Title,
  Label,
  PlayBtn,
};
