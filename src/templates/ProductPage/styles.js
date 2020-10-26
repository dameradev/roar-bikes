import styled from '@emotion/styled'

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
`
export const ProductDetails = styled.div`
  .product {
    &__title {
      font-size: 3.2rem;
      font-weight: bold;
    }

    &__description {
      text-align: justify;
    }
  }
`
export const ProductImage = styled.div``
