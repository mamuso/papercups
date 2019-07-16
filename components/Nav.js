import React from "react";
import { Link } from "../routes";
import styled from "styled-components";

export const Nav = styled.nav`
  display: block;
  padding: 0 1.2rem;
  width: 100%;
  text-align: right;
  overflow: hidden;
  &.cup {
    background: ${props => props.theme.colors.gray[1]};
  }
`;

export const Homelink = styled.a`
  float: left;
  padding: 2rem;
  & img {
    width: 3.2rem;
  }
`;

export const Navlink = styled.span`
  display: inline-block;
  padding: 2.6rem 2rem;
  opacity: 0.8;
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.xsmall};
`;

const NavItem = ({ cup, context }) => (
  <Nav className={context}>
    <Homelink href="/">
      <img src="/static/coffee.png" alt="Paper Cups" />
    </Homelink>
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
