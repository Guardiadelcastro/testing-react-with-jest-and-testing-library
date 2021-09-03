import * as React from 'react'
import './App.css'

export function addSpacesBeforeCapitalLetters(text) {
  return text.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [color, setColor] = React.useState('red')
  const [disabled, setDisabled] = React.useState(false)

  const getNewButtonColor = (activeColor) =>
    activeColor === 'red' ? 'blue' : 'red'

  return (
    <div>
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? 'gray' : color }}
        onClick={() => setColor(getNewButtonColor)}
      >
        Change to {getNewButtonColor(color)}
      </button>
      <label>
        <input
          type="checkbox"
          onChange={(e) => setDisabled(e.target.checked)}
        />
        Disable the button
      </label>
    </div>
  )
}

export default App
