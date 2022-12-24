import {
  Container,
  InputTitle,
  InputSearch,
} from "../styles/NewPlaylistModal.styled.js";
import ReactDom from "react-dom";
import { useState, useEffect, useContext } from "react";
import useDebounce from "../hooks/useDebounce";
import { getTracks } from "../utils/ApiCalls";
import { Modal as MUIModal } from "@mui/material";

function Modal({ open, handleClose }) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);

  function fetchTracks() {
    getTracks(query).then((data) => setTracks(data));
  }

  useDebounce(
    () => {
      if (query !== undefined) {
        fetchTracks();
      }
    },
    1000,
    [query]
  );

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <MUIModal open={open} onClose={handleClose}>
        <Container>
          <div>
            <img alt="playlist cover" />
            <InputTitle placeholder="Playlist title" />
          </div>

          <InputSearch
            placeholder="Search for a track..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div>{tracks?.map(track =>{
            return <p>{track.name}</p>
          })}</div>
        </Container>
      </MUIModal>
    </>,
    document.getElementById("portalNewPlaylist")
  );
}

export default Modal;
