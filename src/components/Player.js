import { PlayerContainer } from "../styles/Global.styled.js";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Footer from "./Footer";
import Album from "./Album";
import Playlist from "./Playlist";
import Show from "./Show";
import Artist from "./Artist";
import Search from "./Search";
import Discography from "./Discography";
import Library from "./Library";
import { Routes, Route, HashRouter, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./../GlobalContext";
import { getUrlToken, spotifyAPI } from "./../spotify";
import { getUserPlaylists } from "./../utils/ApiCalls";
import useAuth from "../hooks/useAuth";
import { apiRequest } from "./../requests";

export default function Player({ code }) {
   const navigate = useNavigate();
   const accessToken = useAuth(code);
  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (!accessToken) return;
    dispatch({ type: "SET_TOKEN", payload: accessToken });
    spotifyAPI.getMe().then((data) => {
      dispatch({ type: "SET_USER", payload: data });
    });
    
    getUserPlaylists().then((data) => {
      dispatch({ type: "SET_USER_PLAYLISTS", payload: data });
    });
  }, [accessToken, spotifyAPI]);


  useEffect(() => {
    if (code !== "custom") {
      apiRequest.put("/status");
    }
  }, []);

   useEffect(() => {
      if (userInfo.playlists) {
      navigate('/');
     }
   }, [userInfo.playlists])
   
   
  if (userInfo.playlists.length == 0) return <Loader full />;

  return (
    <PlayerContainer>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/album" element={<Album />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/show" element={<Show />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/artist/:id/discography/album" element={<Discography />} />
        <Route path="/artist/:id/related" element={<Discography />} />
        <Route path="/collection" element={<Library />} />
        <Route path="/collection/:category" element={<Library />} />
      </Routes>
      <Footer />
    </PlayerContainer>
  );
}
