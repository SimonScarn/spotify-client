import { Grid, Wrapper } from "../styles/Global.styled";
import { Header, Content, Group } from "../styles/Groupings.styled";
import React from "react";

export default function Groupings() {
  return (
    <Wrapper>
      <Header>
        <h1>Create your own taste <strong>(grid playground)</strong></h1>
      </Header>

      <Content>
        <Group>
          <h2>Logic</h2>
          <h2>Roset</h2>
          <h2>Tha Carter</h2>
        </Group>
        <Group>
          <h2>Jay-Zi</h2>
          <h2>Tedas</h2>
          <h2>G-Eazy</h2>
        </Group>
      </Content>
    </Wrapper>
  );
}
