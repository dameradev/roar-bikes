import styled from '@emotion/styled'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useContext, useEffect } from 'react'
// import { PriceTag, Product, Title } from '../components/ProductGrid/styles'

import StoreContext from '~/context/StoreContext'
import { Img } from '~/utils/styles'
import { getPrice } from '../utils/helpers'
import { respondTo } from '../utils/respondTo'

import BikeBackgound from '../assets/images/bikes-backg.jpg'
import Product from '../components/ProductGrid/product'

import BackgroundSlider from 'gatsby-image-background-slider'
import Slideshow from '../components/Slideshow'
import Filters from '../components/Filters'

import handlePrice from '../utils/handlePrice'

const BikePageStyles = styled.div`
  /* background: url(${BikeBackgound}) no-repeat; */
  background-position-x: 60%;
  /* background-repeat: 1; */
  padding: 5rem 10%;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5rem;
  ${respondTo.tabletMini`
    grid-template-columns: minmax(30rem, 1fr); 
    justify-content: center;   
  `}
  .filters {
    width: 30rem;

    ${respondTo.tabletMini`
      display: none;
      grid-template-columns: 1fr;    
    `}
    h3 {
      font-size: 3rem;
      font-weight: 500;
    }
    ul {
      list-style: none;
      h4 {
        padding: 2rem 0;
      }
    }

    .filters-item {
      border-top: 2px solid lightgrey;
      li {
        padding: 0.8rem 0;
        font-style: italic;
      }
    }
  }
  .bike-grid {
    /* max-width: 60%; */
    display: grid;
    /* text-align: center; */

    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    grid-gap: 5rem;
    justify-items: space-between;
     a {
      /* max-height: 20rem; */
      img {
       /* object-fit: cover; */
       /* width: 70% important; */
       /* max-height: 100% !important; */
      }
    
    }
  }
`
const bikes = props => {
  const filteredBikes = handlePrice(props)
  return (
    <>
      <Slideshow
        // query={'/slideshow/i'}
        slidesCaptions={[
          { text: 'Chose your type of riding', button: 'road bikes' },
          { text: 'Riding has never been better', button: 'electric bikes' },
        ]}
      />

      <BikePageStyles>
        <Filters
          selectedTag={props.pageContext.tag}
          location={props.location}
          type={'bikes'}
        />
        <div className="bike-grid">
          {filteredBikes.length ? (
            filteredBikes.map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  images: [firstImage],
                  variants: [firstVariant],
                },
                node,
              }) => <Product key={id} node={node} />
            )
          ) : (
            <h2>We don't have any products based on your search criteria!</h2>
          )}
        </div>
      </BikePageStyles>
    </>
  )
}

export const query = graphql`
  query BikesQuery($tagRegex: String) {
    bikes: allShopifyProduct(
      sort: { fields: [createdAt], order: DESC }
      filter: { productType: { ne: "accessories" }, tags: { regex: $tagRegex } }
    ) {
      edges {
        node {
          id
          title
          handle
          createdAt
          images {
            id
            originalSrc
            localFile {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          tags
          variants {
            price
          }
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`

export default bikes
