import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('button changes text and color on click', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', { name: /change to blue/i })
  expect(buttonElement).toBeInTheDocument()
  expect(buttonElement).toHaveStyle({ backgroundColor: 'red' })
  fireEvent.click(buttonElement)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' })
  expect(buttonElement.textContent).toBe('Change to red')
})

test('initial conditions', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', { name: /change to blue/i })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })

  expect(buttonElement).toBeEnabled()
  expect(checkbox).not.toBeChecked()
})

test('checkbox toggles the disabled attribute on the button', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', { name: /change to blue/i })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  expect(buttonElement).toBeDisabled()
  fireEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()
  expect(buttonElement).toBeEnabled()
})
