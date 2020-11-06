import queryString from 'query-string'
export default (props, type) => {
  let price = props.location.search
    ? queryString.parse(props.location.search)
    : null
  // console.log()
  let minPrice = null
  let maxPrice = null

  if (price) {
    const priceFormated = JSON.stringify(price.price)
    minPrice = priceFormated.split('-')[0].replace(/[^a-z0-9-]/g, '')
    maxPrice = priceFormated.split('-')[1]?.replace(/[^a-z0-9-]/g, '')
  }

  let data = props?.data?.bikes?.edges
  if (type === 'accessories') data = props?.data?.accessories?.edges
  let filteredData = data

  if (minPrice || maxPrice) {
    filteredData = data.filter(({ node }) => {
      const minAmount = +node.priceRange.minVariantPrice.amount
      const maxAmount = +node.priceRange.maxVariantPrice.amount
      if (maxPrice) {
        if (
          (minAmount >= minPrice && maxAmount <= maxPrice) ||
          (minAmount <= maxPrice && maxAmount >= minPrice)
        )
          return node
      } else if (minAmount >= minPrice || maxAmount >= minPrice) {
        console.log('here')
        return node
      }
    })
  }

  return filteredData
}
