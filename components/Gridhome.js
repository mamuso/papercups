import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  padding: 1.6rem;
  @media ${props => props.theme.device.xxlarge} {
    grid-template-columns: 1fr;
  }
`;

const GridhomeItem = ({ children }) => <Grid>{children}</Grid>;

export default GridhomeItem;
