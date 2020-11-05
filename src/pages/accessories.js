import styled from '@emotion/styled'
import React from 'react'
import Slideshow from '../components/Slideshow'

import lights from '../assets/images/lights.png'
import helmets from '../assets/images/helmets.png'
import phone from '../assets/images/phone.png'
import bags from '../assets/images/bags.png'
import Product from '../components/ProductGrid/product'

const AccesoriesStyles = styled.div`
  padding: 5rem 10%;

  .category-shortcuts {
    max-width: 120rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    gap: 5rem;
    justify-items: center;

    /* justify-content: center; */

    &__item {
      position: relative;

      img {
        height: 35rem;
        width: 50rem;
        filter: brightness(80%);
      }
      p {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-transform: uppercase;
        text-align: center;
        font-size: 5rem;
        font-weight: bold;
        z-index: 1;
      }
    }
  }

  .accesories-grid {
    display: grid;
    /* text-align: center; */

    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    grid-gap: 5rem;
    justify-items: space-between;
  }
`

const categoryShortcuts = [
  {
    img: lights,
    text: 'Lights',
  },
  {
    img: helmets,
    text: 'Helmets',
  },
  {
    img: phone,
    text: 'Phone Accessories',
  },
  {
    img: bags,
    text: 'Bags',
  },
]
const Accesories = props => {
  const accesories = props?.data?.accesories?.edges
  return (
    <>
      <Slideshow
        slidesCaptions={[
          {
            text: 'Your cycling journey doesn’t stop with just the bike',
            button: 'Shop now',
          },
        ]}
      />
      <AccesoriesStyles>
        <div className="category-shortcuts">
          {categoryShortcuts.map(item => (
            <div className="category-shortcuts__item">
              <p>{item.text}</p>
              <img src={item.img} alt={item.text} />
            </div>
          ))}
        </div>
        <div className="accesories-grid">
          {accesories.map(
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
      </AccesoriesStyles>
    </>
  )
}

export const query = graphql`
  query {
    accesories: allShopifyProduct(
      sort: { fields: [createdAt], order: DESC }
      filter: { productType: { in: "accesories" } }
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
          variants {
            price
          }
        }
      }
    }
  }
`

export default Accesories
