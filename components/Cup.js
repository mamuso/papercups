import styled from "styled-components";

import Cupdetails from "./Cupdetails";

export const CupGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
  margin: 0 auto;

  &.small {
    grid-template-columns: 20rem auto;
    max-width: 64rem;
  }

  &.large {
    position: relative;
    z-index: 2;
    grid-template-columns: 52rem auto;
  }
`;

export const CupImg = styled.div`
  grid-area: cup;
`;

export const CupMeta = styled.div`
  grid-area: card;
`;

export const Img = styled.img`
  .small & {
    width: 30rem;
    margin-left: -6rem;
  }

  .large & {
    width: 60rem;
  }
`;

export const CupTitle = styled.h2``;

export const CupAddress = styled.address``;

const CupItem = ({ cup, size }) => (
  <CupGrid className={size}>
    <CupMeta>
      <CupTitle>{cup.name}</CupTitle>
      <CupAddress>{cup.address}</CupAddress>
    </CupMeta>
    <CupImg>
      <Img
        src={`/static/cups/${cup.slug}@${size}.png`}
        alt={`${cup.name} coffee cup`}
      />
    </CupImg>
  </CupGrid>
);

export default CupItem;
