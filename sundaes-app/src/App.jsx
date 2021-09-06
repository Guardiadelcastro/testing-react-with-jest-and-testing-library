import * as React from 'react'
import Container from 'react-bootstrap/Container'
import { OrderDetailsProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

function App() {
  const [orderPhase, setOrderPhase] = React.useState('inProgress')
  return (
    <Container>
      <OrderDetailsProvider>
        {(() => {
          switch (orderPhase) {
            case 'inProgress':
              return <OrderEntry setOrderPhase={setOrderPhase} />
            case 'review':
              return <OrderSummary setOrderPhase={setOrderPhase} />
            case 'complete':
              return <OrderConfirmation setOrderPhase={setOrderPhase} />
            default:
              return null
          }
        })()}
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
