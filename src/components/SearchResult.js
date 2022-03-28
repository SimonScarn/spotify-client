import { PlayBtn } from "../styles/Global.styled.js";
import {
  Container,
  Image,
  Title,
  DeleteBtn,
} from "../styles/SearchResult.styled.js";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { spotifyAPI } from "../spotify";
import { getArtists, getDescription, getReleaseDate } from "../utils/ApiData";
import PlayCircleIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from '@mui/icons-material/Clear';
import defaultImgSrc from "../assets/defaultimgsrc.png";

function SearchResult({ item, view }) {
  const [remove, setRemove] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userInfo: { savedAlbums },
    dispatch,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const prevPath = useLocation().pathname;
  const { pathname } = useLocation();

  function checkStorage(item) {

    let currentItems =
      JSON.parse(localStorage.getItem("recentlySearched")) || [];


    const isStored = currentItems.some(e => e.id === item.id);

    if (!isStored) {
      localStorage.setItem(
        "recentlySearched",
        JSON.stringify([...currentItems, item])
      );
    }
  }

  const openSearchResult = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const href = e.target.getAttribute("href");
    if (href !== null && href.includes("artist")) {
      return;
    }

    checkStorage(item);

    switch (item.type) {
      case "album":
        navigate(`/album/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      case "show":
        navigate(`/show/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      case "artist":
        navigate(`/artist/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      case "playlist":
        navigate(`/playlist/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
      default:
        navigate(`/album/${item.id}`, {
          state: {
            prevPath: pathname,
          },
        });
        break;
    }
  };

  function playItem(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("play/pause coming soon");
    dispatch({ type: "SET_CURRENT_TRACK", payload: [item.uri] });
  }

  function deleteItem(e, id, view) {
    e.stopPropagation();  

    if (view === "search") {
      let recentlySearchedItems = JSON.parse(localStorage.getItem("recentlySearched"));
      recentlySearchedItems = recentlySearchedItems.filter(e => e.id !== id);
      localStorage.setItem("recentlySearched", JSON.stringify(recentlySearchedItems));

      //! force rerender
      return;
    }
    
    let promise;
    switch (item.type) {
      case "album":
        promise = spotifyAPI.removeFromMySavedAlbums([item.id]);
        break;
      case "playlist":
        promise = spotifyAPI.unfollowPlaylist(item.id);
        break;
      case "artist":
        promise = spotifyAPI.unfollowArtists([item.id]);
        break;
      case "show":
        promise = spotifyAPI.removeFromMySavedShows([item.id]);
        break;
    }
    promise.then(() => {
      setRemove(true);
    });
  }

  useEffect(() => {}, [item]);

  if (remove) return null;

  return (
    <Container onClick={(e) => openSearchResult(e, item)}>
      <div>
        {isLoading && (
          <Image
            src={defaultImgSrc}
            style={{
              borderRadius: item.type == "artist" && "50%",
            }}
            cover
          />
        )}
        <Image
          alt="item image"
          src={
            !isLoading || item?.images[0]?.url
              ? item?.images[0]?.url
              : defaultImgSrc
          }
          style={{
            display: isLoading ? "none" : "inline",
            borderRadius: item.type == "artist" && "50%",
          }}
          onLoad={() => setIsLoading(false)}
        />
        <h2>{item.name}</h2>
        {item.publisher && <h3>{item.publisher}</h3>}
        {item.owner && <h3>{item.owner["display_name"]}</h3>}

        {view === "artist" ? (
          <Title>{getReleaseDate(item?.["release_date"])}</Title>
        ) : (
          <Title>{item?.artists && getArtists(item.artists)}</Title>
        )}
        {(view == "collection" || view ==  "search") && (
          <DeleteBtn onClick={(e) => deleteItem(e, item.id, view)}>
            <ClearIcon style={{color: 'red', background: 'pink', borderRadius: "100px",  }}/>
          </DeleteBtn>
        )}


        <PlayBtn onClick={playItem}>
          <PlayCircleIcon onClick={playItem} />
        </PlayBtn>
      </div>
    </Container>
  );
}

export default SearchResult;
