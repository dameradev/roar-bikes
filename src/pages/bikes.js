import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
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

const BikePageFilters = styled.div`
  padding: 1rem 10%;
  .select-wrapper {
    width: 20rem;
    height: 5rem;
    position: relative;
    color: #606060;
    border: 1px solid #606060;

    &:after {
      content: '⌄';
      color: #606060;
      display: inline-block;
      right: 11px;
      top: 6px;
      height: 34px;
      width: 34px;
      position: absolute;
      pointer-events: none;
    }
  }
  select {
    padding: 1rem 2.5rem;
    font-size: 1.8rem;
    color: inherit;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    border: none;
    font-weight: 800;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;

    &::-ms-expand {
      display: none;
    }
    /* &::::before */

    option {
      &:first-of-type {
        font-size: 1.8rem;
        padding: 1rem 2.5rem;
      }
    }
  }
`

const bikes = props => {
  // const {
  //   store: { checkout },
  // } = useContext(StoreContext)

  const bikes = props?.data?.bikes?.edges

  const priceRange = [
    '500$-999$',
    '1000$-1999$',
    '2000$-2999$',
    '3000$-3999$',
    '4000$-4999$',
    '5000$-5999$',
    '6000$-6999$',
    '7000$+',
  ]
  // console.log(bikes.node)
  // const {
  //   node: { id },
  // } = bikes
  // console.log(bikes.flat())

  return (
    <>
      <Slideshow
        // query={'/slideshow/i'}
        slidesCaptions={[
          { text: 'Chose your type of riding', button: 'road bikes' },
          { text: 'Riding has never been better', button: 'electric bikes' },
        ]}
      />
      <BikePageFilters>
        <div className="select-wrapper">
          <select name="price">
            <option>Price</option>
            {priceRange.map(price => (
              <option value={price}>{price}</option>
            ))}
          </select>
        </div>
      </BikePageFilters>
      <BikePageStyles>
        {/* <div className="filters">
        <h3>Filters</h3>
        <ul className="filters-item">
          <li>
            <h4>Category</h4>
            <ul>
              <li>Mountain Bikes</li>
              <li>Road Bikes</li>
              <li>City/Urban Bikes</li>
              <li>Electric Bikes</li>
              <li>Junior Bikes</li>
            </ul>
          </li>
        </ul>
        <ul className="filters-item">
          <li>
            <h4>Price category</h4>
            <ul>
              {priceRange.map(priceItem => (
                <li>{priceItem}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div> */}
        <div className="bike-grid">
          {bikes.map(
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
              <Product node={node} />
            )
          )}
        </div>
      </BikePageStyles>
    </>
  )
}

export const query = graphql`
  query {
    bikes: allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
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
          variants {
            price
          }
        }
      }
    }
  }
`

export default bikes
