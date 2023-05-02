import { Grid, Wrapper } from "../styles/Global.styled";
import { Header, Content, Group } from "../styles/Groupings.styled";
import React, { useEffect, useState } from "react";
import { spotifyAPI } from "../spotify";
import SearchResult from "./SearchResult";

export default function Groupings() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    spotifyAPI.getMySavedAlbums({ limit: 16 }).then((data) => {
      let items = data.items.map((e) => e.album);
      console.log('hujass', items)
      setGroups(createGroups(items));
    });
  }, []);

  function createGroups(groups) {
    let newArr = [];
    for (let i = 0; i <= 15; i += 4) {
      newArr.push({ items: groups.slice(i, i + 4) });
    }
    return newArr;
  }

  return (
    <Wrapper>
      <Header>
       
      </Header>

      <Content>
       {groups?.map((group) => {

        return (
            <Group>
              {group.items.map((album) => {
              return  <SearchResult key={album.id} item={album} view={"groupings"} events/>;
              })}
            </Group>
          );  
        
        })} 
      </Content>
      
    </Wrapper>
  );
}
