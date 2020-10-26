import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import { Container, TwoColumnGrid, GridLeft, GridRight } from '~/utils/styles'
import {
  ProductTitle,
  ProductDescription,
  ProductDetails,
  ProductImage,
  ProductStyles,
} from './styles'
import styled from '@emotion/styled'

import Img from 'gatsby-image'

const ProductPageStyles = styled.div`
  padding: 5rem 10%;
`

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <ProductPageStyles>
        <ProductStyles>
          <ProductImage>
            {product.images.map(image => (
              <Img
                fluid={image.localFile.childImageSharp.fluid}
                key={image.id}
                alt={product.title}
              />
            ))}
          </ProductImage>
          <ProductDetails>
            <ProductTitle className="product__title">
              {product.title}
            </ProductTitle>
            <ProductDescription
              className="product__description"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <ProductForm product={product} />
          </ProductDetails>
        </ProductStyles>
      </ProductPageStyles>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
