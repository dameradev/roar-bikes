const path = require(`path`)

async function turnBikesIntoPages({ graphql, actions }) {
  // 1. Get the template
  const bikesTemplate = path.resolve('./src/pages/bikes.js')
  // 2. query all the toppings

  // {
  //   allShopifyProduct {
  //     edges {
  //       node {
  //         handle
  //       }
  //     }
  //   }
  // }
  // const { data } = await graphql(`
  //   {
  //     bikes: allShopifyProduct {
  //
  //     }
  //   }
  // `)
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
    console.log(data)
    console.log(data.bikes, 'bikes')

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
  console.log(data, 'here')
  console.log('turn pages itno bis')
  // 3. createPage for that topping
  // data.toppings.nodes.forEach(topping => {
  //   actions.createPage({
  //     path: `topping/${topping.name}`,
  //     component: toppingTemplate,
  //     context: {
  //       topping: topping.name,
  //       // TODO Regex for Topping
  //       toppingRegex: `/${topping.name}/i`,
  //     },
  //   })
  // })
  // 4. Pass topping data to pizza.js
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
  await Promise.all([turnProductsIntoPages(params), turnBikesIntoPages(params)])
}
