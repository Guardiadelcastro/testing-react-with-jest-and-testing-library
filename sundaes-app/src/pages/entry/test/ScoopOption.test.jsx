import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoopOption from '../ScoopOption'

test("invalid scoop number shows error and doesn't submit change", () => {
  render(
    <ScoopOption
      name="chocolate"
      imagePath="/fakeimagepath"
      updateItemCount={jest.fn()}
    />
  )

  const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2.25')
  expect(chocolateInput).toHaveClass('is-invalid')
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '-1')
  expect(chocolateInput).toHaveClass('is-invalid')
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '11')
  expect(chocolateInput).toHaveClass('is-invalid')
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(chocolateInput).not.toHaveClass('is-invalid')
})
