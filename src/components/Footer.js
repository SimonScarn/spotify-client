import { useContext, useEffect } from "react";
import {Container,  Controls, CurrentTime, TotalTime } from "../styles/Footer.styled";
import FooterPlayer from "./SpotifyPlayer";

export default function Footer() {

  return (
    <Container>
      <FooterPlayer />
        <CurrentTime>0:00</CurrentTime>
        <TotalTime>3:33</TotalTime>
        <div>next up</div>
    </Container>
  );
}
