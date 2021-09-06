import * as React from 'react'
import Options from './Options'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../contexts/OrderDetails'
export default function OrderEntry({ setOrderPhase }) {
  const [
    {
      totals: { grandTotal },
    },
  ] = useOrderDetails()

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {grandTotal} </h2>
      <Button
        disabled={grandTotal === '$0.00'}
        onClick={() => setOrderPhase('review')}
      >
        Order Sundae!
      </Button>
    </div>
  )
}
