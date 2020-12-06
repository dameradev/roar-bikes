import styled from '@emotion/styled'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useContext, useEffect } from 'react'
// import { PriceTag, Product, Title } from '../components/ProductGrid/styles'

import StoreContext from '~/context/StoreContext'
import { Img } from '~/utils/styles'
import { getPrice } from '../utils/helpers'
import { respondTo } from '../utils/respondTo'

import BikeBackgound from '../assets/images/bikes-backg.jpg'
import promotionItem from '../assets/images/promotion-item.png'
import promotionItemHelmet from '../assets/images/helmet-promotion.png'
import Product from '../components/ProductGrid/product'

import BackgroundSlider from 'gatsby-image-background-slider'
import Slideshow from '../components/Slideshow'
import Filters from '../components/Filters'

import handlePrice from '../utils/handlePrice'

const BikePageStyles = styled.div`

  /* background: url(${BikeBackgound}) no-repeat; */
  background-position-x: 60%;
  box-shadow: 0px 3px 6px #00000029;
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

    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
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

const HeroStyles = styled.div`
  background: var(--darkblue);
  height: 30rem;
  color: #fff;
  padding: 5rem;
  text-align: center;
  h1 {
    text-transform: uppercase;
  }
  p {
    margin-top: 2rem;
    text-transform: capitalize;
    font-weight: 100;
  }
`

const ProductsLayout = styled.div`
  padding: 5rem;
  top: -15rem;

  ${respondTo.mobileSmall`
    padding: 2rem;
  `}

  position: relative;

  .promotions {
    height: 30rem;
    display: grid;
    grid-template-columns: 60% 40%;
    ${respondTo.tablet`
      grid-template-columns: 50% 50%;
    `}
    &__item {
      background: var(--blue);
      display: flex;
      justify-content: space-between;

      &__details {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #fff;
        ${respondTo.mobilePortrait`
          padding: 1.5rem;
        `}

        p {
          font-size: 1.2rem;
          background: var(--black);
          width: fit-content;
          padding: 2px 5px;
          color: #fff;
        }

        h1 {
          font-size: 1.6rem;
          font-weight: 100;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        h2 {
          text-transform: uppercase;
          font-size: 2.4rem;

          ${respondTo.mobilePortrait`
            font-size: 1.6rem;
          `}
        }

        button {
          background: var(--black);
          text-transform: uppercase;
          font-size: 1.4rem;
          width: fit-content;
          padding: 0.5rem 1.5rem;
        }
      }

      img {
        max-width: 60%;
        padding: 2rem 1rem;
        ${respondTo.tablet`
          display: none;
        `}
      }
      &-1 {
        flex-direction: row-reverse;
        background: var(--purple);

        .promotions__item__details {
          text-align: right;
          p,
          button {
            align-self: flex-end;
          }
        }

        img {
          padding-left: 2rem;
          height: 20rem;
          width: 20rem;
          align-self: center;
        }
      }
    }
  }
`

const bikes = props => {
  const filteredBikes = handlePrice(props)
  return (
    <>
      <HeroStyles className="hero">
        <h1>{props.pageContext.tag || 'All bikes'}</h1>
        <p>Bikes > {props.pageContext.tag || 'All bikes'}</p>
      </HeroStyles>
      <ProductsLayout>
        {/* <Slideshow
        // query={'/slideshow/i'}
        slidesCaptions={[
          { text: 'Chose your type of riding', button: 'road bikes' },
          { text: 'Riding has never been better', button: 'electric bikes' },
        ]}
      /> */}

        <div className="promotions">
          <div className="promotions__item">
            <div className="promotions__item__details">
              <p>new</p>
              <div>
                <h1>Moutain Bike</h1>
                <h2>Scale ROAR 600</h2>
              </div>

              <button>See more</button>
            </div>
            <img src={promotionItem} />
          </div>
          <div className="promotions__item promotions__item-1">
            <div className="promotions__item__details">
              <p>sale</p>
              <div>
                <h1>Bontrager helmet</h1>
                <h2>QUANTUM MIPS</h2>
              </div>

              <button>See more</button>
            </div>
            <img src={promotionItemHelmet} />
          </div>
        </div>

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
      </ProductsLayout>
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
