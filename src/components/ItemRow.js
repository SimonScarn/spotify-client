import { PlayBtn } from "../styles/Global.styled.js";
import {
  Container,
  Image,
  ItemLink,
  Details,
} from "../styles/ItemRow.styled.js";
import { getArtists } from "../utils/ApiData";
import { Tooltip } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayArrow";
import { useState, useEffect } from "react";
import defaultImgSrc from "../assets/defaultimgsrc.png";
import { useNavigate } from "react-router-dom";

function Item({ item, events }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  function playItem(e) {
    e.preventDefault();
    e.stopPropagation();
    // dispatch({ type: "SET_CURRENT_TRACK", payload: item.uri });
  }

  const openItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/album/${item.album ? item.album.id : item.id}`);
  };

  return (
    <Container onClick={(e) => openItem(e, item)} events={events}>
      <Tooltip
        title={`${item?.album?.name} (${item?.album?.["release_date"].slice(
          0,
          4
        )})`}
        placement="top"
      >  
        <Image
          alt="track img"
          src={
            isLoading
              ? defaultImgSrc
              : item.album
              ? item.album.images[0].url
              : item.images[0].url
          }
          onLoad={() => setIsLoading(false)}
        />
      </Tooltip>
      <Details>
        <h2>{item.name}</h2>
        <p>{getArtists(item.artists)}</p>
      </Details>
      <PlayBtn row onClick={playItem}>
        <PlayCircleIcon />
      </PlayBtn>
    </Container>
  );
}

export default Item;

{
  /* <ItemLink to={`/album/${item.album ? item.album.id : item.id}`}>
</ItemLink> */
}
