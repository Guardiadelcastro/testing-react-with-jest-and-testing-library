import { render, screen, fireEvent } from '@testing-library/react'
import App, { addSpacesBeforeCapitalLetters } from './App'

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

test('button turns to gray when disabled and then to red again when enabled', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', { name: /change to blue/i })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'red' })
})

test('blue button turns to gray when disabled and then to blue again when enabled', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', { name: /change to blue/i })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })
  fireEvent.click(buttonElement)
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' })
})

describe('spaces before came-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(addSpacesBeforeCapitalLetters('Red')).toBe('Red')
  })
  test('Works for one inner capital letter', () => {
    expect(addSpacesBeforeCapitalLetters('MidnightBlue')).toBe('Midnight Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(addSpacesBeforeCapitalLetters('MediumVioletRed')).toBe(
      'Medium Violet Red'
    )
  })
})
