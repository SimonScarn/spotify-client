import {
  Container,
  NavBtn,
  UserInfo,
  Input,
  LibaryLink,
} from "../styles/TopHeader.styled";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import defaultImgSrc from "../assets/defaultimgsrc.png";


function TopHeader({ query, changeQuery, color }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    if (state?.prevPath) {
      setPrevPath(state.prevPath);
    }
  }, [state]);

  function goBack() {
    if (prevPath) {
      navigate(prevPath);
    } else {
      navigate(-1);
    }
  }

  function toggleNavDropdown() {
  }

  return (
    <Container>
      <div>
        <NavBtn onClick={goBack}>
          <ArrowBackIosIcon />
        </NavBtn>
        <NavBtn onClick={() => navigate(1)}>
          <ArrowForwardIosIcon />
        </NavBtn>
      </div>

      {changeQuery ? (
        <Input
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Search for a song etc. ..."
        />
      ) : (
        <div style={{display: "flex"}}>
          <LibaryLink to="/collection/playlists">Playlists</LibaryLink>
          <LibaryLink to="/collection/albums">Albums</LibaryLink>
          <LibaryLink to="/collection/artists">Artists</LibaryLink>
          <LibaryLink to="/collection/shows">Shows</LibaryLink>
        </div>
      )}

      {/* <UserInfo>
        <Avatar alt="user avatar" src={userInfo?.user?.images[0]?.url ? userInfo.user.images[0].url : defaultImgSrc}>
          {userInfo?.user?.["display_name"][0]}
        </Avatar>
        <h4>{userInfo?.user?.["display_name"]}</h4> 
        <ArrowDropDownIcon onClick={toggleNavDropdown}/>
      </UserInfo> */}
    </Container>
  );
}

export default TopHeader;
