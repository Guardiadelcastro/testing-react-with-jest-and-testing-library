import * as React from 'react'
import './App.css'

function App() {
  const [color, setColor] = React.useState('red')
  const [disabled, setDisabled] = React.useState(false)

  const getNewButtonColor = (activeColor) =>
    activeColor === 'red' ? 'blue' : 'red'

  return (
    <div>
      <button
        disabled={disabled}
        style={{ backgroundColor: color }}
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
