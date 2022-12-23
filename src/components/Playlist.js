import { LoaderContainer, Toolbar } from "../styles/Global.styled.js";
import {
  Container,
  Header,
  Details,
  Name,
  RefreshBtn,
  Tracks,
  ToolbarMini,
} from "../styles/Playlist.styled";
import { useState, useEffect, useReducer, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "./../GlobalContext";
import { spotifyAPI } from "../spotify";
import {
  addToPlaylist,
  removeFromPlaylist,
  getRecommendations,
  getPlaylistData,
} from "../utils/playlist";
import { playItem } from "../utils/main.js";
import TopHeader from "./TopHeader";
import SongRow from "./SongRow";
import Loader from "./Loader.js";
import defaultImgSrc from "../assets/defaultimgsrc.png";
import { IconButton } from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";



function Playlist() {
  const location = useLocation();

  const { userInfo, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [initial, setInitial] = useState(false);
  const [favoritesMap, setFavoritesMap] = useState([]);

  const [count, setCount] = useState(1);

  useEffect(() => {
    setInitial(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    const playlistID = location.pathname.split("/")[2];
    setTimeout(() => {
      getPlaylistData(playlistID).then((data) => {
        console.log(data)
        setPlaylist(data.playlist);
        setIsLoading(false);
        const newState = data.tracks.map((e, idx) => {
          return { ...e, id: idx + 1 };
        });
        console.log(`%c GETTIN NEW TRACKS for ${data.playlist.name}`, 'color: red');
        setTracks(newState);
      });
    }, 1500);
  }, [location, count]);
/* 
  useEffect(() => {
    //only setplaylist NOT teacks
    const playlistID = location.pathname.split("/")[2];
    console.log('sdfsdf', playlistID)
    getPlaylistData(playlistID).then((data) => {
      console.log('count is chaning', data.playlist)
      setPlaylist(data.playlist);
    });
  }, [count]) */

  useEffect(() => {
    if (Object.keys(playlist).length === 0) return;
    console.log('test1`')
    if (tracks && playlist) {
      console.log('test2')
      refreshRecommendations(tracks);
    }
  }, [location]);

  function refreshRecommendations(tracks) {
    getRecommendations(tracks).then((data) => {
      setRecommendedTracks(data);
    });
  }

  /*  function checkFavorites(tracks) {
    spotifyAPI
      .containsMySavedTracks([tracks.map((e) => e.track.id)])
      .then((data) => {
        setFavoritesMap(data);
      });
  }  */

/*   useEffect(() => {
    checkFavorites(tracks);
  }, [tracks]);  */

  return (
    <Container>
      <TopHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header>
            <img
              alt="playlist cover"
              src={
                playlist?.images[0]?.url
                  ? playlist?.images[0]?.url
                  : defaultImgSrc
              }
            />
            <div>
              <p style={{ textTransform: "capitalize" }}>{playlist?.type}</p>
              <Name>{playlist?.name}</Name>
              <Details>
                <p>{playlist?.owner["display_name"]}</p>
                <p>
                  <span>{playlist?.tracks.total}</span>{" "}
                  {playlist?.tracks.total > 1 ? "tracks" : "track"}
{/*                   <span>{playlist?.}</span> */}
                </p>
              </Details>
            </div>
          </Header>
          <Toolbar>
            <IconButton onClick={() => dispatch({type: "SET_CURRENT_TRACK", payload: playItem(playlist)})} size="large" style={{ color: "white" }}>
              <PlayCircleFilledIcon fontSize="large" />
            </IconButton>
          </Toolbar>
          <hr />
          <Tracks>
            {tracks
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((item) => {
                return (
                  <SongRow
                    key={item.id}
                    id={item.id}
                    song={item.track}
       /*        isFavorite={favoritesMap[item.id - 1]}  */
                    playlistId={playlist.id}
                    removeFromPlaylist={removeFromPlaylist}
                    setCount={setCount}
                  />
                );
              })}
          </Tracks>
          <hr />
          <h3 style={{ marginLeft: "20px", fontSize: "30px" }}>
            Recommended:{" "}
          </h3>
          <>
            {recommendedTracks?.slice(0, 10).map((item) => {
              return (
                <SongRow
                  key={item.id}
                  song={item}
                  recommended={true}
                  playlistId={playlist.id}
                  addToPlaylist={addToPlaylist}
                  setCount={setCount}
                />
              );
            })}
            <ToolbarMini>
              <RefreshBtn onClick={() => refreshRecommendations(tracks)}>
                Refresh
              </RefreshBtn>
            </ToolbarMini>
          </>
        </>
      )}
    </Container>
  );
}

export default Playlist;
