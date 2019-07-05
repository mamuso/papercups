import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { fontXXXL } from "../utils/fonts";

export const Nav = styled.nav`
  display: block;
  text-align: right;
  overflow: hidden;
`;

export const Homelink = styled.span`
  float: left;
  padding: 2rem 3.2rem;
  font-size: ${fontXXXL};
  line-height: 1;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
`;

const NavItem = ({ post }) => (
  <Nav>
    <Link route="home">
      <a>
        <Homelink>☕️</Homelink>
      </a>
    </Link>
    <a>Map</a>
    <a>About</a>
  </Nav>
);

export default NavItem;
