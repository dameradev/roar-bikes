import styled from '@emotion/styled'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import React, { useState } from 'react'

const BikePageFilters = styled.div`
  /* padding: 1rem 10%; */
  display: flex;
  .select-wrapper {
    margin: 0 2rem;
    width: 25rem;
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
    text-transform: capitalize;
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

const BikesFilter = props => {
  const { bikeFilters, accesFilters } = useStaticQuery(graphql`
    query {
      bikeFilters: allShopifyProduct(
        filter: { productType: { ne: "accessories" } }
      ) {
        edges {
          node {
            tags
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
      accesFilters: allShopifyProduct(
        filter: { productType: { eq: "accessories" } }
      ) {
        edges {
          node {
            tags
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
  `)
  let filtersToReduce = bikeFilters.edges
  if (props.type === 'accessories') filtersToReduce = accesFilters.edges

  let tags = filtersToReduce.reduce((acc, { node }) => {
    node.tags.forEach(tag => {
      if (acc[tag]) {
        acc[tag].count += 1
      } else {
        acc[tag] = {
          count: 1,
        }
      }
    })
    return acc
  }, [])

  const tagsFormated = []
  for (let key in tags) {
    tagsFormated.push({ category: key, count: tags[key].count })
  }

  let prices = []
  filtersToReduce.forEach(({ node }) => {
    prices.push(+node.priceRange.minVariantPrice.amount)
    prices.push(+node.priceRange.maxVariantPrice.amount)
  })
  prices.sort((a, b) => (a > b ? 1 : -1))
  prices = [...new Set(prices)]

  const newPrices = prices.map((price, index) => {
    return `
      ${price} 
      ${prices.length - 1 !== index ? 'to' : ''} 
      ${prices[index + 1] ? prices[index + 1] : '+'} €
    `
  })
  newPrices.pop()

  const handleCategoryChange = e => {
    navigate(`/${props.type}/${e.target.value}`)
  }

  const handleFilterChange = (e, filterName) => {
    // console.log(e.target.value)
    navigate(`${props.pathname}?${filterName}=${e.target.value}`)
  }

  //   console.log(props, 'props')
  return (
    <BikePageFilters>
      <div
        className="select-wrapper"
        onChange={e => handleFilterChange(e, 'price')}
      >
        <select name="price">
          <option value="">Price</option>
          {newPrices.map((price, index) => (
            <option key={`${price}-${index}`} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div className="select-wrapper">
        <select
          value={props.selectedTag}
          onChange={e => handleCategoryChange(e)}
        >
          <option value="">Category</option>
          {tagsFormated.map((tag, index) => (
            <option key={`${tag}-${index}`} value={tag.category}>
              {tag.category}({tag.count})
            </option>
          ))}
        </select>
      </div>
    </BikePageFilters>
  )
}

export default BikesFilter