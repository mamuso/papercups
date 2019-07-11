import React from "react";
import { Link } from "../routes";
import Twemoji from "react-twemoji";
import styled from "styled-components";
import { fontM, fontXXL, monospace } from "../utils/fonts";

export const Nav = styled.nav`
  display: block;
  padding: 0 1.2rem;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  overflow: hidden;
`;

export const Homelink = styled.span`
  float: left;
  padding: 2rem;
  font-size: ${fontXXL};
  line-height: 0.6;
  & img {
    width: 3rem;
  }
`;

export const Navlink = styled.span`
  display: inline-block;
  padding: 2.6rem 2rem;
  line-height: 1;
  opacity: 0.8;
  font-family: ${monospace};
  font-size: ${fontM};
`;

const NavItem = ({ cup }) => (
  <Nav>
    <Link route="home">
      <a title="Paper Cups">
        <Homelink>
          <Twemoji
            options={{
              folder: "svg",
              ext: ".svg"
            }}
          >
            ☕️
          </Twemoji>
        </Homelink>
      </a>
    </Link>
    <Link route="map">
      <a>
        <Navlink>Map</Navlink>
      </a>
    </Link>
    <Link route="about">
      <a>
        <Navlink>About</Navlink>
      </a>
    </Link>
  </Nav>
);

export default NavItem;
