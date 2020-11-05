import styled from '@emotion/styled'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import React from 'react'

const BikePageFilters = styled.div`
  /* padding: 1rem 10%; */
  display: flex;
  .select-wrapper {
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
  const { tags } = useStaticQuery(graphql`
    query {
      tags: allShopifyProduct(filter: { productType: { ne: "accessories" } }) {
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

  console.log(tags)

  let tagsNew = tags.edges.reduce((acc, { node }) => {
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
  for (let key in tagsNew) {
    tagsFormated.push({ category: key, count: tagsNew[key].count })
  }

  const handleChange = e => {
    console.log(e.target.value)
    navigate(`/bikes/${e.target.value}`)
  }

  console.log(props, 'props')
  return (
    <BikePageFilters>
      {/* <div className="select-wrapper">
        <select name="price">
          <option>Price</option>
          {newPrices.map(price => (
            <option value={price}>{price}</option>
          ))}
        </select>
      </div> */}

      <div className="select-wrapper">
        <select value={props.selectedTag} onChange={e => handleChange(e)}>
          <option>Category</option>
          {tagsFormated.map((tag, index) => (
            <option value={tag.category}>
              {tag.category}({tag.count})
            </option>
          ))}
        </select>
      </div>
    </BikePageFilters>
  )
}

export default BikesFilter
