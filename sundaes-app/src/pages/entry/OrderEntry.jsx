import * as React from 'react'
import Options from './Options'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../contexts/OrderDetails'
export default function OrderEntry({ setOrderPhase }) {
  const [
    {
      totals: { scoops, grandTotal },
    },
  ] = useOrderDetails()

  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {grandTotal} </h2>
      <Button
        disabled={scoops === '$0.00'}
        onClick={() => setOrderPhase('review')}
      >
        Order Sundae!
      </Button>
    </div>
  )
}
