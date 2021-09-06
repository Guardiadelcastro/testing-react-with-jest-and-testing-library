import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />)

  // make sure total starts at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')
  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')
  //update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />)

  // total starts at 0

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // Add cherries  and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  })
  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
  // Add m&ms and check subtotal
  const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
  userEvent.click(mmsCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // Remove cherries and check subtotal
  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})

describe('grand total', () => {
  //starts at 0

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /^grand total: \$/i,
    })

    expect(grandTotal).toHaveTextContent('0.00')

    //first add scoop
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')
    //then add topping
    const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
    userEvent.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /^grand total: \$/i,
    })

    expect(grandTotal).toHaveTextContent('0.00')

    //first add topping
    const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
    userEvent.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')
    //then add scoop
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')
  })
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /^grand total: \$/i,
    })

    expect(grandTotal).toHaveTextContent('0.00')

    //first add topping
    const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
    userEvent.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')
    //then add scoop
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
    // updates correctly if items are removed
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '0')
    expect(grandTotal).toHaveTextContent('1.50')
    userEvent.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('0.00')
  })
})
