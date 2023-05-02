import { useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function FooterPlayer() {
  const playerRef = useRef();


  return (
    <SpotifyPlayer
      ref={playerRef}
      // token={userInfo.accessToken}
      // uris={userInfo.currentTrack}
      play={false}
      styles={{
        activeColor: "blue",
        bgColor: "#333",
        color: "pink",
        loaderColor: "#fff",
        sliderColor: "aqua",
        trackArtistColor: "aqua",
        trackNameColor: "pink",
      }}
    />
      
  );
}



/*   updateSavedStatus={() =>{
    dispatch({type: 'SET_PLAYING_STATE', payload: !userInfo.isPlaying})
  }} */
  /*  showSaveIcon */