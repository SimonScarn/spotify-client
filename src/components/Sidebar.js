import {
  Container,
  Toolbar,
  SearchSection,
  Input,
  SidebarLink,
  PlaylistContainer,
  PlaylistItem,
} from "../styles/Sidebar.styled.js";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import SidebarOption from "./SidebarOption";
import NewPlaylistModal from "./NewPlaylistModal";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import AddBox from "@mui/icons-material/AddBox";
import Favorite from "@mui/icons-material/Favorite";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { IconButton, Tooltip } from "@mui/material";
import { getUserPlaylists } from "../utils/ApiCalls.js";

export default function Sidebar() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    setPlaylists([userInfo.playlists][0]);
    setSearchedPlaylists([userInfo.playlists][0]);
  }, [userInfo.playlists]);

  useEffect(() => {
    if (query === "") {
      setSearchedPlaylists([userInfo.playlists][0]);
    } else {
      const items = [userInfo.playlists][0].filter((e) =>
        e.name.toLowerCase().includes(query)
      
        );
      setSearchedPlaylists(items);
    }
  }, [query, userInfo.playlists.length]);

  function showPlaylistModal() {
    setOpenModal(true);
  }

  function hidePlaylistModal() {
    setOpenModal(false);
  }

  function addSong(e) {
    e.preventDefault();
    console.log("coming soon");
  }

  function togglePlaylist(e, id) {
    e.preventDefault();
    dispatch({ type: "SET_PLAYER_TRACK", payload: [`spotify:playlist:${id}`] });
  }

  function refetchPlaylists() {
    setSearchedPlaylists(playlists);
    setQuery("");
  }

  return (
    <Container>
      <SidebarLink to="/" exact={true}>
        <SidebarOption title="Home" Icon={Home} />
      </SidebarLink>
      <SidebarLink to="/search">
        <SidebarOption title="Search" Icon={Search} />
      </SidebarLink>
      <SidebarLink to="/collection">
        {" "}
        <SidebarOption title="Library" Icon={LibraryMusic} />
      </SidebarLink>
      <br />
      <NewPlaylistModal open={openModal} handleClose={hidePlaylistModal} />
      <div onClick={showPlaylistModal}>
        <SidebarOption title="Create new playlist" Icon={AddBox} />
      </div>
      <SidebarLink to="/collection/tracks">
        <SidebarOption title="Liked songs" Icon={Favorite} />
      </SidebarLink>
      <SidebarLink to="/groupings" style={{color: 'limegreen', fontWeight: '900', wordBreak: '9px'}}>
        <SidebarOption title="Groupings" Icon={WorkspacesIcon}/>
      </SidebarLink>

      <SearchSection>
        <Tooltip title="restore default playlists order" placement="top-end">
          <IconButton style={{ color: "white" }} onClick={refetchPlaylists}>
            <CachedIcon />
          </IconButton>
        </Tooltip>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for a playlist..."
        ></Input>
      </SearchSection>
      <PlaylistContainer>
       {searchedPlaylists &&
          searchedPlaylists.map((playlist) => {
            return (
              <SidebarLink to={`/playlist/${playlist.id}`}>
                <PlaylistItem key={playlist.id}>
                  <p>{playlist.name}</p>
                  <Toolbar>
                    <AddIcon />
                    <PlayArrowIcon
                      onClick={(e) => togglePlaylist(e, playlist.id)}
                    />
                  </Toolbar>
                </PlaylistItem>
              </SidebarLink>
            );
          })} 
      </PlaylistContainer>
    </Container>
  );
}
