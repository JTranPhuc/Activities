import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  onShowFormActivity: () => void;
}

export default function Navbar({ onShowFormActivity: showFormActivity }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item name="Activities">
          <Button
            onClick={showFormActivity}
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
