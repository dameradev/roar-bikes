const path = require(`path`)

async function turnBikesIntoPages({ graphql, actions }) {
  const bikesTemplate = path.resolve('./src/pages/bikes.js')

  return graphql(`
    {
      bikes: allShopifyProduct(filter: { productType: { ne: "accessories" } }) {
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
  `).then(({ data }) => {
    let tags = data.bikes.edges.reduce((acc, { node }) => {
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
      tagsFormated.push(key)
    }

    tagsFormated.forEach(tag => {
      actions.createPage({
        path: `bikes/${tag}`,
        component: bikesTemplate,
        context: {
          tag: tag,
          // TODO Regex for Topping
          tagRegex: `/${tag}/i`,
        },
      })
    })
  })
}

async function turnAccessoriesIntoPages({ graphql, actions }) {
  const accessoriesTemplate = path.resolve('./src/pages/accessories.js')

  return graphql(`
    {
      accessories: allShopifyProduct(
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
  `).then(({ data }) => {
    let tags = data.accessories.edges.reduce((acc, { node }) => {
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
      tagsFormated.push(key)
    }

    tagsFormated.forEach(tag => {
      actions.createPage({
        path: `accessories/${tag}`,
        component: accessoriesTemplate,
        context: {
          tag: tag,
          // TODO Regex for Topping
          tagRegex: `/${tag}/i`,
        },
      })
    })
  })
}

async function turnProductsIntoPages({ graphql, actions }) {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/product/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })
  })
}

exports.createPages = async params => {
  await Promise.all([
    turnProductsIntoPages(params),
    turnBikesIntoPages(params),
    turnAccessoriesIntoPages(params),
  ])
}
