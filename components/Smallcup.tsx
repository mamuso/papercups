import Link from 'next/link'
import styled from 'styled-components'

import Cup from './Cup'

interface SmallCupProps {
  slug: string
}

export const SmallCup = styled.div<SmallCupProps>`
  position: relative;
  padding: 3.2rem 3.2rem 2.2rem 3.2rem;
  background-position: center center;
  background-size: cover;
  border-radius: ${(props) => props.theme.radii.small};
  overflow: hidden;
  transition: background 0.35s;
  &:hover {
    background-image: linear-gradient(40deg, ${(props) => props.theme.colors.gray[3]} 20%, ${(props) => props.theme.colors.gray[4]}), url('/maps/${(props) => props.slug}.png');
    background-color: ${(props) => props.theme.colors.gray[3]};
  }
  &:hover .small {
    top: 0;
  }
  @media ${(props) => props.theme.device.medium} {
    & {
      padding: 1rem 3.2rem 2rem 3.2rem;
      width: 100%;
      min-height: 20rem;
      overflow: hidden;
    }
  }
`

const SmallCupItem = ({ cup }: any) => (
  <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>
    <a>
      <SmallCup slug={cup.slug} className="smallcup">
        <Cup cup={cup} size="small" />
      </SmallCup>
    </a>
  </Link>
)

export default SmallCupItem
