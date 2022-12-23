import {
  ArtistsContainer,
  PlaylistShowBtn,
  FavoriteBtn,
  ImageThumbnail,
} from "../styles/Global.styled.js";
import {
  Index,
  Container,
  Player,
  Toolbar,
  Info,
  PlayIcon,
} from "../styles/AlbumRow.styled.js";
import { useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "../GlobalContext";
import { getItemDuration, getArtists } from "../utils/ApiData";
import { snackbarMessageSchema } from "../utils/schemas.js";
import Modal from "./Modal";
import { Snackbar, Alert, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function AlbumRow({ item, popular }) {
  const [favorite, setFavorite] = useState(false);
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [state, setState] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    snackbarMessageSchema["add"]
  );

  useEffect(() => {
    spotifyAPI
      .containsMySavedTracks([item.id])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [state]);

  function showPlaylistModal() {
    setOpen(true);
  }

  function hidePlaylistModal() {
    setOpen(false);
  }

  function playItem() {
    if (isPlaying) {
      setIsPlaying(false);
      dispatch({ type: "SET_PLAYING_STATE", payload: false });
    } else if (!isPlaying) {
      dispatch({
        type: "SET_PLAYER_TRACK",
        payload: [`spotify:track:${item.id}`],
      });
      setIsPlaying(true);
      dispatch({ type: "SET_PLAYING_STATE", payload: true });
    } else {
      setIsPlaying(false);
    }
  }

  function addFavorite() {
    spotifyAPI
      .addToMySavedTracks([item.id])
      .then(() => {
        setState((prev) => !prev);
        setSnackbarMessage(snackbarMessageSchema["add"]);
        setSnackbarVisibility(true);
      })
      .catch((err) => console.error(err));
  }

  function removeFavorite() {
    spotifyAPI
      .removeFromMySavedTracks([item.id])
      .then(() => {
        setState((prev) => !prev);
        setSnackbarMessage(snackbarMessageSchema["remove"]);
        setSnackbarVisibility(true);
      })
      .catch((err) => console.error(err));
  }

  function closeSnackbar() {
    setSnackbarVisibility(false);
  }

  return (
    <>
      {snackbarVisibility && (
        <Snackbar
          open={snackbarVisibility}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ horizontal: "bottom", vertical: "center" }}
          style={{ bottom: "80px", left: "2%" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity="info"
            sx={{ width: "30%" }}
            style={{ borderRadius: "10px", display: "flex" }}
          >
            <div style={{ textAlign: "center", width: "25vw" }}>
              <span>
                <b>{item.name}</b> was {snackbarMessage} your favorite tracks
              </span>
            </div>
          </Alert>
        </Snackbar>
      )}
      <Container>
        {popular ? (
          <Tooltip
            title={`${item.album.name} (${item?.album?.["release_date"].slice(
              0,
              4
            )})`}
            placement="left-start"
          >
            <div>
              <img src={item.album.images[0].url} />
            </div>
          </Tooltip>
        ) : (
          <Player>
            <Index>{item["track_number"]}</Index>
            <PlayIcon>
              {isPlaying ? (
                <PauseIcon onClick={playItem} />
              ) : (
                <PlayArrowIcon onClick={playItem} />
              )}
            </PlayIcon>
          </Player>
        )}
        <Info>
          <h3>{item.name}</h3>
          <ArtistsContainer>{getArtists(item.artists)}</ArtistsContainer>
        </Info>
        <Toolbar>
          <Modal
            open={open}
            handleClose={hidePlaylistModal}
            songID={item.uri}
          />
          <PlaylistShowBtn onClick={showPlaylistModal}>
            <LibraryAddIcon />
          </PlaylistShowBtn>
          <FavoriteBtn favorite={favorite}>
            {favorite ? (
              <FavoriteIcon onClick={removeFavorite} />
            ) : (
              <FavoriteBorderIcon onClick={addFavorite} />
            )}
          </FavoriteBtn>
          {popular && (
            <p>
              <ArrowCircleUpIcon />
              <span>{item.popularity}</span>
            </p>
          )}
        </Toolbar>
        <span>{getItemDuration(item["duration_ms"])}</span>
      </Container>
    </>
  );
}

export default AlbumRow;
