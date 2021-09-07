import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />)

  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const altTexts = scoopImages.map((element) => element.alt)
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />)

  const toppingsImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  })
  expect(toppingsImages).toHaveLength(3)

  const altTexts = toppingsImages.map((element) => element.alt)
  expect(altTexts).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})

test('no scoops are added if scoop input is invalid', async () => {
  render(<Options optionType="scoops" />)

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '-1')

  const subtotal = screen.getByText(/^scoops total: /i)
  expect(subtotal).toHaveTextContent('$0.00')
})
