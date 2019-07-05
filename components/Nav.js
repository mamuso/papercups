import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { fontXXL, monospace } from "../utils/fonts";

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
  line-height: 1;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
`;

export const Navlink = styled.span`
  display: inline-block;
  padding: 2.6rem 2rem;
  line-height: 1;
  opacity: 0.8;
  font-family: ${monospace};
`;

const NavItem = ({ post }) => (
  <Nav>
    <Link route="home">
      <a>
        <Homelink>☕️</Homelink>
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
