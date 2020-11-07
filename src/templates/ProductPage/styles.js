import styled from '@emotion/styled'
import { respondTo } from '../../utils/respondTo'

export const ProductTitle = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 15px;
  word-wrap: break-word;
  font-family: 'Helvetica', 'Helvetica', sans-serif;
  font-weight: 400;
  margin: 0 0 0.5rem;
  line-height: 1.4;
`

export const ProductDescription = styled.div`
  margin-top: 40px;
  font-family: 'Helvetica', 'Helvetica', sans-serif;
  font-weight: 300;
`

export const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(20rem, 40rem);
  grid-column-gap: 6rem;
  ${respondTo.tabletMini`
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
      
  `}
`
export const ProductDetails = styled.div`
  .product {
    &__title {
      font-size: 3.2rem;
      font-weight: bold;
    }

    &__description {
      text-align: justify;
      ${respondTo.mobileSmall`
        font-size: 1.6rem;
      `}
    }
  }
`
export const ProductImage = styled.div`
  .gatsby-image-wrapper {
    /* width: ; */
  }
`
