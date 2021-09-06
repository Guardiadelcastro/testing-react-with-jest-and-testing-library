import * as React from 'react'
import Options from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'
export default function OrderEntry() {
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
    </div>
  )
}
