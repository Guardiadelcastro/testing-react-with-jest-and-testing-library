import * as React from 'react'
import axios from 'axios'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import { Row } from 'react-bootstrap'
import AlertBanner from '../common/AlertBanner'
import { pricePerItem } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'
export default function Options({ optionType }) {
  const [items, setItems] = React.useState([])
  const [error, setError] = React.useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()
  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(({ data }) => {
        setItems(data)
      })
      .catch((error) => {
        setError(true)
      })
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = {
    scoops: ScoopOption,
    toppings: ToppingOption,
  }[optionType]

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
        {items.map((item) => (
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
              updateItemCount(itemName, newItemCount, optionType)
            }
          />
        ))}
      </Row>
    </>
  )
}
