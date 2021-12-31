import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 52rem auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: 'cup card';
`

export const Cup = styled.div`
  grid-area: cup;
  min-height: 46rem;
  & img {
    position: absolute;
    width: 64rem;
    margin-left: -6rem;
    bottom: -20rem;
  }
`

const BigcupItem = ({ cup }: any) => (
  <Wrapper>
    <Cup>
      <img src={`/cups/${cup.slug}@L.png`} alt={`${cup.name} coffee cup`} />
    </Cup>
  </Wrapper>
)

export default BigcupItem
