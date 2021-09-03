import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

test('checkbox is unchecked by default and button is disabled', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  })
  const button = screen.getByRole('button', { name: /confirm order/i })
  expect(checkbox).not.toBeChecked()
  expect(button).toBeDisabled()
})

test('checking the checkbox enables the button, and unchecking disables it', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  })
  const button = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(checkbox)
  expect(button).toBeEnabled()
  userEvent.click(checkbox)
  expect(button).toBeDisabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)
  const nullPopover = screen.queryByText(
    /No ice cream will actually be delivered/i
  )
  expect(nullPopover).not.toBeInTheDocument()

  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No ice cream will actually be delivered/i)
  )
  // expect(nullPopoverAgain).not.toBeInTheDocument()
})
