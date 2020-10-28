import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { TextField, MenuItem } from '@material-ui/core'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'

const ProductFormStyles = styled.div`
  padding: 5rem 0 0 0;

  [name='Size'] {
    /* background: blue; */
    display: none;

    &:checked {
    }
  }

  [name='Size']:checked + label {
    color: var(--blue);
    border: 1px solid currentColor;
  }

  .form-group {
    padding: 1.5rem 0;
  }
  .size {
    padding: 0.5rem 1.5rem;
    /* width: 4rem; */
    margin: 0 1rem;
    font-size: 1.6rem;
    border: 1px solid #9b9b9b;
    font-weight: bold;
    color: #9b9b9b;
  }
  .select {
    width: 100%;
    /* background: blue; */
    /* height: 5rem; */

    font-size: 5rem;
    &::placeholder {
      font-size: 1.8rem;
    }
    label {
      font-size: 2rem;
      /* padding-bottom: 1rem; */
    }
    p {
      font-size: 1.6rem;
    }
  }
  .select-input {
    padding-top: 1rem;
    font-size: 2rem;
  }
  .select-input[value=''] {
    /* margin-top: -10rem;
    padding-top: 0; */
  }
  .quantity {
    input {
      display: none;
    }
    label {
      text-transform: uppercase;
      color: #808080;
    }

    &__controls {
      display: inline-block;
      padding-left: 5rem;

      p {
        display: inline-block;
        padding: 0 2rem;
        color: #808080;
      }
    }
  }

  .add-to-cart {
    padding: 1rem 0;
    width: 100%;
    font-size: 2rem;
    background: white;
    border: 1px solid var(--blue);
    border-radius: none;
    color: var(--blue);
    text-transform: uppercase;

    &:hover {
      background: var(--blue);
      color: white;
    }
  }
`

const FormGridStyles = styled.div``

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = price => {
    addVariantToCart(productVariant.shopifyId, quantity, price)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  // <>
  // {name === 'Size' ? (
  //   values.map(value => (
  //     <div className="form-group" key={id}>
  //       <input
  //         value={value}
  //         key={`${name}-${value}`}
  //         id={`${name}-${value}`}
  //         disabled={checkDisabled(name, value)}
  //         name={name}
  //         type="radio"
  //       />

  //       <label htmlFor={`${name}-${value}`} className="size">
  //         {value}
  //       </label>
  //     </<div className="form-group" key={id}>
  //   ))
  // ) : (
  //   <TextField
  //     id="standard-select-currency"
  //     select
  //     label="Select"
  //     value={currency}
  //     onChange={handleChange}
  //     helperText="Please select your currency"
  //   >
  //     {values.map(value => (
  //       <MenuItem key={`${name}-${value}`} value={value}>
  //         {value}
  //       </MenuItem>
  //     ))}
  //   </TextField>
  // )}

  // </>

  // console.log(options)

  const increaseQuantity = quantity => {
    setQuantity(quantity !== 10 ? quantity + 1 : quantity)
  }
  const decreaseQuantity = quantity => {
    setQuantity(quantity !== 0 ? quantity - 1 : quantity)
  }
  return (
    <ProductFormStyles>
      <h3>{price}</h3>
      {options.map(({ id, name, values }, index) => (
        <div className="form-group">
          {name === 'Size' && <label>{name}</label>}
          {name === 'Size' ? (
            values.map(value => (
              <>
                <input
                  value={value}
                  key={`${name}-${value}`}
                  id={`${name}-${value}`}
                  disabled={checkDisabled(name, value)}
                  name={name}
                  type="radio"
                />
                <label htmlFor={`${name}-${value}`} className="size">
                  {value}
                </label>
              </>
            ))
          ) : (
            <TextField
              className={`select-${name.toLowerCase()} select`}
              id="standard-select-currency"
              select
              label={name.toUpperCase()}
              inputProps={{ className: 'select-input' }}
              // value={currency}
              // onChange={handleChange}
              helperText={`Select ${name} of the bike`}
            >
              {values.map(value => (
                <MenuItem key={`${name}-${value}`} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>
      ))}
      <div className="form-group quantity">
        <label htmlFor="quantity">Quantity</label>
        <div className="quantity__controls">
          <RemoveIcon onClick={() => decreaseQuantity(quantity)}></RemoveIcon>
          <p>{quantity}</p>
          <AddIcon onClick={() => increaseQuantity(quantity)}></AddIcon>
        </div>
        <input
          size="4"
          maxLength="2"
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
      </div>
      <br />

      <button
        className="add-to-cart"
        type="submit"
        disabled={!available || adding}
        onClick={() => handleAddToCart(variant.price)}
      >
        Add to Cart
      </button>
      {!available && <p>This Product is out of Stock!</p>}
    </ProductFormStyles>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
