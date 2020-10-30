import { Link } from 'gatsby'
import React from 'react'
import { Img } from '../../utils/styles'
import { PriceTag, Product as ProductStyles, Title } from './styles'

const Product = ({
  node: {
    id,
    handle,
    title,
    images: [firstImage],
    variants: [firstVariant],
  },
}) => {
  console.log(id, 'here')
  return (
    <ProductStyles key={id}>
      <Link to={`/product/${handle}/`}>
        {firstImage && firstImage.localFile && (
          <Img
            fluid={firstImage.localFile.childImageSharp.fluid}
            alt={handle}
          />
        )}
      </Link>
      <Title>{title}</Title>
      <PriceTag>Starting from {firstVariant.price}</PriceTag>
      <button>Quick Overview</button>
    </ProductStyles>
  )
}

export default Product
