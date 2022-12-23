import { ColorLink } from "../styles/Global.styled";
import moment from "moment";

const filterAlbums = (data) => {
  const albums = data.filter((e) => e["album_type"] === "album");
  return albums.map((e) => {
    return {
      name: e.name,
      artists: e.artists,
      images: [{ url: e.images[0].url }],
      tracksCount: e["total_tracks"],
      releaseDate: e["release_date"],
      id: e.id,
      type: "album",
    };
  });
};

const deleteDuplicates = (items) => {
  console.log(items)

}

const getSongArtists = (artists) => {
  let str = "";
  artists.map((e) => {
    str = str.concat(e.name, ", ");
  });

  return str.replace(/,$/, "");
};

const getItemDuration = (x) => {
  let duration = moment.duration(x);
  let minutes = duration.minutes().toString();
  let seconds = duration.seconds().toString();
  if (seconds.length == 1) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

const getAlbumDuration = (tracks) => {
  let durationMs = 0;
  tracks.items.map((track) => {
    durationMs += track["duration_ms"];
  });
  const { hours, minutes, seconds } = moment.duration(
    durationMs,
    "milliseconds"
  )._data;

  return `${hours > 0 ? hours : ""} ${hours > 0 ? "h" : ""} ${
    minutes > 0 ? minutes : ""
  } ${minutes > 0 ? "m" : ""} ${seconds > 0 ? seconds : ""} ${
    seconds > 0 ? "s" : ""
  }`;
};

const getReleaseDate = (date) => {
  let month = moment(date.split('-')[1], 'MM').format('MMMM');
  let releaseDate = moment(date, "YYYY-MM-DD").format(`D YYYY`).split(' ');
  return `${releaseDate[0]} ${month} ${releaseDate[1]}`
};

const getArtists = (artists) => {
  return artists.map((artist) => {
    return <ColorLink to={`/artist/${artist.id}`}>{artist.name}</ColorLink>;
  });
};


const spaceLongNum = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const getDescription = (item, view) => {
  switch (item.type) {
    case "album":
      return view === "artist"
        ? item["release_date"].substring(0, 4)
        : "";
    case "show":

    
      return item?.publisher;
    case "artist":
      return item.type;
    case "playlist":
      return `by ${item.owner["display_name"]}`;
    case "episode":
      return item?.publisher;
    case undefined:
      return getArtists(item.artists);
    default:
      break;
  }
};

export {
  filterAlbums,
  deleteDuplicates,
  getSongArtists,
  getItemDuration,
  getAlbumDuration,
  getReleaseDate,
  spaceLongNum,
  getDescription,
  getArtists,
};
