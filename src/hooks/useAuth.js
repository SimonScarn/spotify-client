import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./../GlobalContext";
import { apiRequest } from "../requests";
import { spotifyAPI } from "../spotify";

export default function useAuth(code) {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    console.log('CODE efekt===> ', code)
    if (code === "custom") {
      apiRequest.get("/token").then((res) => {
        dispatch({ type: "SET_ACCESS_TOKEN", payload: res.data.accessToken });
        dispatch({
          type: "SET_REFRESH_TOKEN",
          payload: res.data.refreshToken,
        });
        console.log('custom : ', res)
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(1500);
      });
    } else {
      apiRequest
        .post("/login", {
          code: code,
        })
        .then((res) => {
          dispatch({
            type: "SET_ACCESS_TOKEN",
            payload: res.data.accessToken,
          });
          dispatch({
            type: "SET_REFRESH_TOKEN",
            payload: res.data.refreshToken,
          });
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(1500);
          window.history.pushState({}, null, "/");
          return apiRequest.put("/token", {
            userId: "2n2k3kuhhqila73nh56m6ijv3",
            code: code,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          });
        })
        .catch((err) => {
          console.error(err);
          window.location = "/";
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      apiRequest
        .post("/refresh", {
          refreshToken: refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(1500);
          return apiRequest.put("/token", {
            accessToken: res.data.accessToken,
          });
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  
  useEffect(() => {
    if (!accessToken) return;
    spotifyAPI.setAccessToken(accessToken);
  }, [accessToken, spotifyAPI]);

  return accessToken;
}
