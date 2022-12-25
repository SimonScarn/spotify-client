import {
  Container,
  InputTitle,
  InputSearch,
  SearchedTracks,
  Track,
  Header,
  Controls
} from "../styles/NewPlaylistModal.styled.js";
import ReactDom from "react-dom";
import { useState, useEffect, useContext } from "react";
import useDebounce from "../hooks/useDebounce";
import { GlobalContext } from "./../GlobalContext";
import { getTracks } from "../utils/ApiCalls";
import { getArtists } from "../utils/ApiData.js";
import { Modal as MUIModal, IconButton, Tooltip, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { spotifyAPI } from "../spotify.js";

function Modal({ open, handleClose }) {
  const { userInfo } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);

  function fetchTracks() {
    if (query === "") {
      setTracks([]);
      return;
    }
    getTracks(query).then((data) => setTracks(data));
  }

  function createPlaylist() {
    console.log(userInfo.user.id)
    spotifyAPI.createPlaylist(userInfo.user.id, {name: 'TESTT'});
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
          <Header>
            <img alt="playlist cover" />
            <InputTitle placeholder="Playlist title" />
          <InputSearch
            placeholder="Search for a track..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Controls>
            <Button onClick={createPlaylist} color="success" variant="contained">Create</Button>
          </Controls>
          </Header>
          <SearchedTracks>
            {tracks.length > 0 && tracks?.map((track) => {
              return (
                <Track>
                  <Tooltip
                    title={`${track.album.name} (${track?.album?.[
                      "release_date"
                    ].slice(0, 4)})`}
                    placement="left-start"
                  >
                    <img alt="album cover" src={track.album.images[0].url} />
                  </Tooltip>
                  <div>{track.name}</div>
                  <div>{getArtists(track.artists)}</div>
                  <div>
                    <IconButton>
                      <AddCircleOutlineIcon color="success" />
                    </IconButton>
                  </div>
                </Track>
              );
            })}
          </SearchedTracks>
        </Container>
      </MUIModal>
    </>,
    document.getElementById("portalNewPlaylist")
  );
}

export default Modal;
