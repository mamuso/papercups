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
  transition: background 0.35s;
  &:hover {
    background-image: linear-gradient(33deg, 
      ${props => props.theme.colors.gray[1]}, 
      ${props => props.theme.colors.gray[2]}), 
      url("/static/maps/${props => props.slug}.png");
    background-color: ${props => props.theme.colors.gray[1]};
  }
  &:hover .small {
    top: 0;
  }
  @media ${props => props.theme.device.large} {
    & {
      padding: 1rem 3.2rem 2rem 3.2rem;
      width: 100%;
      overflow: hidden;
    }
  }
`;

const CupcontainerItem = ({ cup }) => (
  <Link route="cup" params={{ slug: cup.slug }}>
    <a>
      <CupContainer slug={cup.slug} className="cup">
        <Cup cup={cup} size="small" />
      </CupContainer>
    </a>
  </Link>
);

export default CupcontainerItem;
