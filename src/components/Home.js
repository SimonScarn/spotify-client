import { Wrapper, Section, ContentGrid } from "../styles/Global.styled.js";
import { useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "../GlobalContext";
import SearchResult from "./SearchResult";
import TopHeader from "./TopHeader";
import ItemRow from "./ItemRow";
import Row from "./Row";
import Loader from "./Loader.js";

function Home() {
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [newReleases, setNewReleases] = useState({ albums: [], singles: [] });
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    spotifyAPI
      .getMyTopArtists()
      .then((data) => {
        setTopArtists(data.items);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getMyRecentlyPlayedTracks()
      .then((data) => {
        data.items.map((e) => {});
        setRecentlyPlayed(removeDuplicates(data));
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getMyTopTracks()
      .then((data) => {
        setTopTracks(data.items);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getNewReleases()
      .then((data) => {
        const albums = data.albums.items.filter(
          (e) => e["album_type"] == "album"
        );
        const singles = data.albums.items.filter(
          (e) => e["album_type"] == "single"
        );

        setNewReleases({ ...newReleases, singles: singles, albums: albums });
      })
      .catch((err) => console.error(err));
    spotifyAPI.getFeaturedPlaylists().then((data) => {
      setFeaturedPlaylists(data.playlists.items);
    });
  }, [userInfo.token]);

  function removeDuplicates(data) {
    const items = data.items.map((e) => e.track);
    return Array.from(new Set(items.map((e) => e.id))).map((id) =>
      items.find((e) => e.id === id)
    );
  }

  return (
    <Wrapper>
      <TopHeader />
      {topArtists.length == 0 ? (
        <Loader />
      ) : (
        <>
          <Section>
            <h2>Top Artists</h2>
            <Row items={topArtists} view="home" />
          </Section>
          <Section>
            <h2>Recently played</h2>
            <Row double items={recentlyPlayed} />
          </Section>
          <Section>
            <h2>Your top tracks</h2>
            <Row double items={topTracks} />
          </Section>
          <Section>
            <h2>New releases</h2>
            <h3>New singles</h3>
            <Row double items={newReleases.singles} />
            <br />
            <h3>New albums</h3>
            <Row items={newReleases.albums} view="home" />
          </Section>
          <Section>
            <h2>Featured playlists</h2>
            <Row items={featuredPlaylists} view="home" />
          </Section>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
