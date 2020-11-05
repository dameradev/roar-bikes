import styled from '@emotion/styled'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useContext } from 'react'
// import { PriceTag, Product, Title } from '../components/ProductGrid/styles'

import StoreContext from '~/context/StoreContext'
import { Img } from '~/utils/styles'
import { getPrice } from '../utils/helpers'
import { respondTo } from '../utils/respondTo'

import BikeBackgound from '../assets/images/bikes-backg.jpg'
import Product from '../components/ProductGrid/product'

import BackgroundSlider from 'gatsby-image-background-slider'
import Slideshow from '../components/Slideshow'
import BikesFilter from '../components/BikesFilter'

import queryString from 'query-string'
import { filter } from 'lodash'

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
  // const {
  //   store: { checkout },
  // } = useContext(StoreContext)

  console.log()
  const price = props.location.search
    ? queryString.parse(props.location.search)
    : null
  // console.log()
  let minPrice = null
  let maxPrice = null

  console.log(price)
  if (price) {
    minPrice = parseInt(
      Array.from(price?.price?.replace(/\D/g, ' ').trim())
        .filter(value => value !== ' ')
        .slice(0, 4)
        .join('')
    )
    maxPrice = parseInt(
      Array.from(price?.price?.replace(/\D/g, ' ').trim())
        .filter(value => value !== ' ')
        .slice(4, 9)
        .join('')
    )
  }
  // console.log(minPrice)
  // console.log(price.replace(/\D/g, ''))
  const bikes = props?.data?.bikes?.edges
  let filteredBikes = bikes

  console.log(maxPrice)
  if (minPrice || maxPrice) {
    filteredBikes = bikes.filter(({ node }) => {
      // console.log(node)
      const minAmount = +node.priceRange.minVariantPrice.amount
      const maxAmount = +node.priceRange.maxVariantPrice.amount
      if (minAmount >= minPrice && maxAmount <= maxPrice) return node
    })
  }

  console.log(filteredBikes)
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
        <BikesFilter
          selectedTag={props.pageContext.tag}
          pathname={props.location.pathname}
        />
        <div className="bike-grid">
          {filteredBikes.map(
            ({
              node: {
                id,
                handle,
                title,
                images: [firstImage],
                variants: [firstVariant],
              },
              node,
            }) => (
              <Product key={id} node={node} />
            )
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
