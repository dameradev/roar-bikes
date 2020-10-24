import styled from '@emotion/styled'

import { breakpoints } from '../../utils/styles'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  padding: 5rem 10%;

  @media (max-width: ${breakpoints.s}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Product = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
`

export const Title = styled.span`
  font-weight: 300;
  font-size: 4rem;
  padding-top: 3rem;
  word-break: break-word;
  /* text-align: center; */
`

export const PriceTag = styled.span`
  font-weight: 300;
  font-size: 2rem;
  /* text-align: center; */
  margin-top: 15px;

  :before {
    content: '';
  }
`
