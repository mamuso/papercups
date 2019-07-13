import { Link } from "../routes";
import styled from "styled-components";

import Cup from "./Cup";

export const CupContainer = styled.div`
  position: relative;
  padding: 4.2rem 3.2rem 3.2rem 3.2rem;
  background-position: center center;
  background-size: cover;
  border-radius: ${props => props.theme.radii};
  overflow: hidden;
  transition: background 0.33s;
  &:hover {
    background-image: linear-gradient(33deg, 
      ${props => props.theme.colors.gray[1]}, 
      ${props => props.theme.colors.gray[2]}), 
      url("/static/maps/${props => props.slug}.png");
    background-color: ${props => props.theme.colors.gray[1]};
  }
`;

const CupcontainerItem = ({ cup }) => (
  <Link route="cup" params={{ slug: cup.slug }}>
    <a>
      <CupContainer slug={cup.slug}>
        <Cup cup={cup} size="small" />
      </CupContainer>
    </a>
  </Link>
);

export default CupcontainerItem;
