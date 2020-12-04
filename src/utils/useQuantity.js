import { useContext } from 'react'
import StoreContext from '~/context/StoreContext'

import reduce from 'lodash/reduce'
const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

export default useQuantity
