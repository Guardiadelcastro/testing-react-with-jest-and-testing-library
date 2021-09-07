import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../../mocks/server'

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  )

  render(<OrderEntry />)

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})

test('order button is disabled if no scoops is ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />)
  const orderButton = await screen.findByRole('button', {
    name: /Order Sundae!/i,
  })
  expect(orderButton).toBeDisabled()
  //order topping
  const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i })
  userEvent.click(mmsCheckbox)
  expect(orderButton).toBeDisabled()
  //order scoop
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(orderButton).toBeEnabled()
  //remove scoops
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '0')
  expect(orderButton).toBeDisabled()
})
