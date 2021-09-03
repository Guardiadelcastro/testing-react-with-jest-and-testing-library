import { render, screen, fireEvent } from '@testing-library/react'
import App, { addSpacesBeforeCapitalLetters } from './App'

test('button changes text and color on click', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', {
    name: /change to midnight blue/i,
  })
  expect(buttonElement).toBeInTheDocument()
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
  fireEvent.click(buttonElement)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MidnightBlue' })
  expect(buttonElement.textContent).toBe('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', {
    name: /change to midnight blue/i,
  })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })

  expect(buttonElement).toBeEnabled()
  expect(checkbox).not.toBeChecked()
})

test('checkbox toggles the disabled attribute on the button', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', {
    name: /change to midnight blue/i,
  })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  expect(buttonElement).toBeDisabled()
  fireEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()
  expect(buttonElement).toBeEnabled()
})

test('button turns to gray when disabled and then to MediumVioletRed again when enabled', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', {
    name: /change to midnight blue/i,
  })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
})

test('MidnightBlue button turns to gray when disabled and then to MidnightBlue again when enabled', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', {
    name: /change to midnight blue/i,
  })
  const checkbox = screen.getByRole('checkbox', { name: /Disable the button/i })
  fireEvent.click(buttonElement)
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(buttonElement).toHaveStyle({ backgroundColor: 'MidnightBlue' })
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
