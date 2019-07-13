import styled from "styled-components";

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

  .small & {
    align-self: end;
    margin-bottom: 5.3rem;
  }

  .large & {
    align-self: center;
  }
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

export const CupTitle = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: ${props => props.theme.fonts.heading};
  line-height: 1;

  .small & {
    font-size: ${props => props.theme.fontSizes.xlarge};
    max-width: 80%;
  }

  .large & {
    font-size: ${props => props.theme.fontSizes.xxlarge};
    color: ${props => props.theme.colors.bodytext};
    width: 80%;
    max-width: 60rem;
  }
`;

export const CupAddress = styled.address`
  position: relative;
  left: -1.6rem;
  top: -1.2rem;
  width: 36rem;
  padding: 1.8rem 1.6rem;
  background: white;
  border-radius: ${props => props.theme.radii};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.small};
  font-style: normal;
  color: ${props => props.theme.colors.lighttext};
`;

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
