import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  padding: 1.6rem;
  background: ${props => props.theme.colors.gray[1]};
  @media ${(props) => props.theme.device.xlarge} {
    grid-template-columns: 1fr;
  }
`

const GridhomeItem = ({ children }: any) => <Grid>{children}</Grid>

export default GridhomeItem
