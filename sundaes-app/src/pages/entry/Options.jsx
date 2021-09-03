import * as React from 'react'
import axios from 'axios'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import { Row } from 'react-bootstrap'

export default function Options({ optionType }) {
  const [items, setItems] = React.useState([])
  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(({ data }) => {
        setItems(data)
      })
      .catch((error) => {
        //TODO: handle error
      })
  }, [optionType])

  const ItemComponent = {
    scoops: ScoopOption,
    toppings: ToppingOption,
  }[optionType]

  return (
    <>
      <Row>
        {items.map((item) => (
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
          />
        ))}
      </Row>
    </>
  )
}
