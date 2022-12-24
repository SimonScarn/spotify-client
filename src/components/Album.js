import { Wrapper, Toolbar } from "../styles/Global.styled.js";
import {
  Image,
  Header,
  ArtistLink,
  Title,
  Label,
  AlbumDetails,
  TracksContainer,
  PlayBtn,
} from "../styles/Album.styled.js";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { spotifyAPI } from "../spotify";
import { getAlbumDuration, getReleaseDate } from "../utils/ApiData";
import AlbumRow from "./AlbumRow";
import Row from "./Row";
import TopHeader from "./TopHeader";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TimerIcon from "@mui/icons-material/Timer";
import PauseIcon from "@mui/icons-material/Pause";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Loader from "./Loader.js";
import SearchResult from "./SearchResult.js";

function Album() {
  const location = useLocation();
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [album, setAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumDuration, setAlbumDuration] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);

  async function getFeaturedAlbums(artists) {
    let albums = [];
    for (let i = 0; i < artists.length; i++) {
      let {items} = await spotifyAPI.getArtistAlbums(artists[i].id, { limit: 50 });
      albums = [...albums, { 'artist': artists[i].name, 'albums': items.filter(e => e.album_group === "album")}];
    }

    return albums;
  }
  useEffect(() => {
    const albumID = location.pathname.split("/")[2];
    spotifyAPI
      .getAlbum(albumID)
      .then((data) => {
        setAlbum(data);
        setAlbumDuration(() => getAlbumDuration(data.tracks));
      })
      .catch((err) => console.error(err));
    spotifyAPI
      .containsMySavedAlbums([albumID])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [location]);

  useEffect(() => {
    if (!album) return;

    getFeaturedAlbums(album.artists).then((data) => {
      setFeaturedAlbums(data)
    });
  }, [album]);

  function addFavorite() {
    spotifyAPI
      .addToMySavedAlbums([album.id])
      .then(() => setFavorite(true))
      .catch((err) => console.error(err));
  }

  function removeFavorite() {
    spotifyAPI
      .removeFromMySavedAlbums([album.id])
      .then(() => setFavorite(false))
      .catch((err) => console.error(err));
  }

  function playAlbum() {
    if (isPlaying) {
      setIsPlaying(false);
      dispatch({ type: "SET_PLAYING_STATE", payload: false });
    } else {
      setIsPlaying(true);
      dispatch({
        type: "SET_PLAYER_TRACK",
        payload: [`spotify:album:${album.id}`],
      });
      dispatch({ type: "SET_PLAYING_STATE", payload: true });
    }
  }

  return (
    <Wrapper>
      <TopHeader color={"red"} />
      {!album ? (
        <Loader />
      ) : (
        <>
          <Header>
            <Image alt="album cover" src={album?.images[1].url} />
            <AlbumDetails>
              <Title>{album?.name}</Title>
              <p>{album?.["album_type"]}</p>
              <div>
                {album?.artists.map((artist) => (
                  <ArtistLink to={`/artist/${artist.id}`}>
                    <span>{artist.name}</span>
                  </ArtistLink>
                ))}
              </div>
              <div>
                <div>
                  <MusicNoteIcon />
                  <span>{album?.tracks.total}</span>
                  {album?.tracks.total > 1 ? "tracks" : "track"}
                </div>
                |
                <div>
                  <TimerIcon />
                  <span>{albumDuration}</span>
                </div>
              </div>
              <div>
                <DateRangeIcon />
                <h3>{getReleaseDate(album?.["release_date"])}</h3>
              </div>
            </AlbumDetails>
          </Header>
          <Toolbar translate={true}>
            <PlayBtn onClick={playAlbum} size="large">
              {isPlaying ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayCircleFilledIcon fontSize="large" />
              )}
            </PlayBtn>
            {favorite ? (
              <FavoriteIcon
                style={{ cursor: "pointer" }}
                onClick={removeFavorite}
                fontSize="large"
              />
            ) : (
              <FavoriteBorderIcon
                style={{ cursor: "pointer" }}
                onClick={addFavorite}
                fontSize="large"
              />
            )}
            <MoreHorizIcon />
          </Toolbar>
          <TracksContainer>
            {album?.tracks.items.map((item) => {
              return <AlbumRow key={item.id} item={item} />;
            })}
          </TracksContainer>
          <Label>{album?.label}</Label>
          <hr />
          {featuredAlbums.map(e => {
            return <>
              <h4>{e.artist}</h4>
              <Row items={e.albums} />
            </>
          })}
        </>
      )}
    </Wrapper>
  );
}

export default Album;
