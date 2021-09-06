import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order phases for happy path', async () => {
  render(<App />)
  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
  userEvent.click(mmsCheckbox)
  // find and click order button

  const orderButton = await screen.findByRole('button', {
    name: /Order Sundae!/i,
  })
  userEvent.click(orderButton)
  // check summmary information based on order
  const listItems = await screen.findAllByRole('listitem')
  const listItemsContents = listItems.map((item) => item.textContent)
  expect(listItemsContents).toEqual(['2 Chocolate', 'M&Ms'])
  // accpet terms and click button to confirm order
  const checkbox = await screen.findByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  })
  userEvent.click(checkbox)
  const finishOrderButton = await screen.findByRole('button', {
    name: /Confirm Order/i,
  })
  userEvent.click(finishOrderButton)
  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()
  //click new order button on confirmation page
  const newElement = await screen.findByRole('button', { name: /new order/i })
  userEvent.click(newElement)
  //check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = await screen.findByText('Scoops total: $', {
    exact: false,
  })

  const toppingsSubtotal = await screen.findByText('Toppings total: $', {
    exact: false,
  })
  expect(scoopsSubtotal).toHaveTextContent('0.00')
  expect(toppingsSubtotal).toHaveTextContent('0.00')
})
