import styled from "styled-components";
import { IconButton } from "@mui/material";
import { PlayBtn, AddLibraryBtn } from "./Global.styled.js";

const ItemToolbar = styled.div`
 /*  height: 30px;
  width: 30px;
  background: red;
  position: absolute;
  border-radius: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-40%); */
`


const Container = styled.div`
  flex: 1 1 150px;
  position: relative;
  z-index: 1;
  height: 200px;
  width: 150px;
  max-width: 150px;
  padding: 20px;
  cursor: pointer;
  object-fit: contain;
  border-radius: 5px;
  pointer-events: ${(props) => props.events ? 'all' : 'none'};

/*   &:hover ${ItemToolbar} {
    visibility: visible;
    transform: scale(4);
    transform-origin: center;
    opacity: 1;
  } */

  &:hover ${PlayBtn} {
    visibility: visible;
    transform: translateY(-40%);
    opacity: 1;
  }

  &:hover ${AddLibraryBtn} {
    visibility: visible;
    transform: translateX(-50%);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: -1;
    background-color: #c0a1cd;
    border-radius: 5px;
    transition: 0.3s ease-in;
  }

  &:hover:before {
    opacity: 0.4;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  h2,
  h3 {
    padding: 0;
    margin: 0;
    margin-top: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h2 {
    font-style: italic;
    font-weight: 900;
    font-size: 18px;
  }
  h3 {
    font-weight: lighter;
    font-size: 16px;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  img {
    height: 150px;
    width: 100%;
    object-fit: ${(props) => (props.cover ? "cover" : "contain")};
    margin: 0;
    pointer-events: none;
  }
`;

const Title = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteBtn = styled(IconButton)`
  && {
    position: absolute;
    top: -1px;
    right: -1px;
    width: 23px;
    height: 23px;
    transform: scale(0.7);
    cursor: default;
    &:hover {
      transform:  scale(1.1);
    }
  }
`;

export { Container, ImageContainer, Title, DeleteBtn, ItemToolbar };

/* 
  

  .searchResult__playIcon {
    background-color: whitesmoke !important;
    border-radius: 25px !important;
    cursor: default;
  }
  
 

  
   */
