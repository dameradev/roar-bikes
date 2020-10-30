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
  text-align: center;
  padding: 2rem;

  &:hover {
    box-shadow: 0px 4px 6px #00000029;
    opacity: 1;
  }
  button {
    width: fit-content;
    padding: 1rem 3rem;
    background: #fff;
    border: 2px solid currentColor;
    color: var(--blue);
    align-self: center;
    font-size: 1.6rem;
    text-transform: uppercase;

    &:hover {
      background: var(--blue);
      color: #fff;
    }
  }
`

export const Title = styled.span`
  font-weight: 300;
  font-size: 3rem;
  padding-top: 3rem;
  word-break: break-word;
  /* text-align: center; */
`

export const PriceTag = styled.span`
  font-weight: 300;
  font-size: 2rem;
  /* text-align: center; */
  margin: 2rem 0;

  :before {
    content: '';
  }
`
